const db = require('../db');

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

async function getAllUsers(req, res) {
  try {
    const users = await db.getAllUsers();
    return res.send(users);
  } catch(err) {
    console.error(err);
  }
}

async function getUserByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const user = await db.getUserByUserId(userId);
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
  createUser,
  getAllUsers,
  getUserByUserId,
  deleteUser,
}