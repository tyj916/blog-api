const db = require('../db');

async function createPost(req, res) {
  try {
    const data = {
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      authorId: req.user.id,
    }

    const post = await db.createPost(data);
    res.send(post);
  } catch(err) {
    console.error(err);
  }
}

async function getAllPosts(req, res) {
  try {
    const allPosts = await db.getAllPosts();
    res.send(allPosts);
  } catch(err) {
    console.error(err);
  }
}

async function getPostByPostId(req, res) {
  try {
    const postId = req.params.postId;
    const post = await db.getPostByPostId(postId);
    res.send(post);
  } catch(err) {
    console.error(err);
  }
}

async function updatePost(req, res) {
  try {
    const postId = req.params.postId;
    const data = {
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    }
    const post = await db.updatePost(postId, data);
    res.send(post);
  } catch(err) {
    console.error(err);
  }
}

async function deletePost(req, res) {
  try {
    const postId = req.params.postId;
    const post = await db.deletePostByPostId(postId);
    res.send(post);
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostByPostId,
  updatePost,
  deletePost,
}