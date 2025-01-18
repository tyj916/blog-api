require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');

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
    return res.status(401).send({
      message: "Incorrect username",
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).send({
      message: "Incorrect password",
    });
  }

  const options = {
    expiresIn: '1h'
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
  hashPassword,
  processLogin,
}