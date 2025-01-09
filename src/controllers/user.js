const db = require('../models');

async function createUser(req, res) {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName || null,
    }

    return await db.createUser(data);
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  createUser,
}