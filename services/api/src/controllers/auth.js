require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

function signJWT(req, res) {
  const user = req.user;
  const options = {
    expiresIn: '1h'
  }

  jwt.sign({user}, process.env.JWT_SECRET, options, (err, token) => {
    res.send({
      token,
    });
  });
}

module.exports = {
  hashPassword,
  signJWT,
}