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

module.exports = {
  hashPassword,
}