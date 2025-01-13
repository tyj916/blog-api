const db = require('../db');

async function createComment(req, res) {
  try {
    const data = {
      content: req.body.content,
      postId: +req.params.postId,
      authorId: req.user.id,
      parentId: +req.params.commentId || null,
    }
    const comment = await db.createComment(data);
    return res.send(comment);
  } catch(err) {
    console.error(err);
  }
}

async function getCommentsByPostId(req, res) {
  try {
    const postId = req.params.postId;
    const comments = await db.getCommentsByPostId(postId);
    return res.send(comments);
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  createComment,
  getCommentsByPostId,
}