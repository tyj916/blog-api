const db = require('../models');

async function getAllUsers(req, res) {
  try {
    const users = await db.getAllUsers();
    return res.send(users);
  } catch(err) {
    console.error(err);
  }
}

async function createUser(req, res) {
  try {
    const data = {
      username: req.body.username,
      password: req.context.hashedPassword,
      displayName: req.body.displayName || null,
    }

    const user = await db.createUser(data);

    return res.send(user);
  } catch(err) {
    console.error(err);
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await db.deleteUserByUserId(req.params.userId);
    return res.send(deletedUser);
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
}