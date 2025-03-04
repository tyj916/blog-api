const db = require('../db');

async function createPost(req, res) {
  try {
    const data = {
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      authorId: req.user.id,
    }

    const createdPost = await db.post.createPost(data);
    res.send(createdPost);
  } catch(err) {
    console.error(err);
  }
}

async function getAllPosts(req, res) {
  try {
    const allPosts = await db.post.getAllPosts();
    res.send(allPosts);
  } catch(err) {
    console.error(err);
  }
}

async function getPostByPostId(req, res) {
  try {
    const postId = req.params.postId;
    const post = await db.post.getPostByPostId(postId);
    res.send(post);
  } catch(err) {
    console.error(err);
  }
}

async function getPublishedPosts(req, res) {
  try {
    const { limit, sortBy } = req.query;
    const publishedPosts = await db.post.getPublishedPosts(limit, sortBy);
    res.send(publishedPosts);
  } catch(err) {
    console.error(err);
  }
}

async function getPostsByAuthorId(req, res) {
  try {
    const { authorId } = req.params;
    const posts = await db.post.getPostsByAuthorId(authorId);
    res.send(posts);
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
    
    const updatedPost = await db.post.updatePost(postId, data);
    res.send(updatedPost);
  } catch(err) {
    console.error(err);
  }
}

async function deletePost(req, res) {
  try {
    const postId = req.params.postId;
    const deletedPost = await db.post.deletePostByPostId(postId);
    res.send(deletedPost);
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostByPostId,
  getPublishedPosts,
  getPostsByAuthorId,
  updatePost,
  deletePost,
}