require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');

async function handleRegister(req, res, next) {
  const { username } = req.body;
  const user = await db.getUserByUsername(username);

  if (user) {
    return res.status(400).send({
      message: "Username already exists"
    });
  }

  next();
}

function hashPassword(req, res, next) {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      next(err);
    } else {
      req.context = {
        hashedPassword,
      };
      next();
    }
  });
}

async function processLogin(req, res) {
  const { username, password } = req.body;
  const user = await db.getUserByUsername(username);

  if (!user) {
    return res.status(400).send({
      message: "Incorrect username",
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).send({
      message: "Incorrect password",
    });
  }

  const options = {
    expiresIn: '7d'
  }

  jwt.sign({user}, process.env.JWT_SECRET, options, (err, token) => {
    if (err) {
      return res.send(err);
    }

    res.send({
      message: "Login Successful",
      token,
    });
  });
}

module.exports = {
  handleRegister,
  hashPassword,
  processLogin,
}