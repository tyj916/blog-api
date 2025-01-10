const db = require('../db');

async function getAllPosts(req, res) {
  try {
    const allPosts = await db.getAllPosts();
    res.send(allPosts);
  } catch(err) {
    console.error(err);
  }
}

async function createPost(req, res) {
  try {
    const data = {
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      authorId: req.user.id,
    }
    return await db.insertPost(data);
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  getAllPosts,
  createPost,
}