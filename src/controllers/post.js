const db = require('../models');

async function getAllPosts(req, res) {
  try {
    const allPosts = await db.getAllPosts();
    res.send(allPosts);
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  getAllPosts,
}