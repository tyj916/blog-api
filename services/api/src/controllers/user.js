const db = require('../db');

async function createUser(req, res) {
  try {
    const data = {
      username: req.body.username,
      password: req.context.hashedPassword,
      displayName: req.body.displayName || null,
    }

    const user = await db.user.createUser(data);

    return res.send(user);
  } catch(err) {
    console.error(err);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await db.user.getAllUsers();
    return res.send(users);
  } catch(err) {
    console.error(err);
  }
}

async function getUserByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const user = await db.user.getUserByUserId(userId);
    return res.send(user);
  } catch(err) {
    console.error(err);
  }
}

async function getUserByUsername(req, res) {
  try {
    const { username } = req.params;
    const user = await db.user.getUserByUsername(username);
    return res.send(user);
  } catch(err) {
    console.error(err);
  }
}

async function getUserPostsByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const posts = await db.user.getUserPostsByUserId(userId);
    return res.send(posts);
  } catch(err) {
    console.error(err);
  }
}

async function getUserPostsByUsername(req, res) {
  try {
    const username = req.params.username;
    const posts = await db.user.getUserPostsByUsername(username);
    return res.send(posts);
  } catch(err) {
    console.error(err);
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.params.userId;
    const data = {
      username: req.body.username,
      password: req.context.hashedPassword,
      displayName: req.body.displayName || null,
    }

    const updatedUser = await db.user.updateUser(userId, data);
    return res.send(updatedUser);
  } catch(err) {
    console.error(err);
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await db.user.deleteUserByUserId(req.params.userId);
    return res.send(deletedUser);
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByUserId,
  getUserByUsername,
  getUserPostsByUserId,
  getUserPostsByUsername,
  updateUser,
  deleteUser,
}