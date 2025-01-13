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

async function getAllComments(req, res) {
  try {
    const comments = await db.getAllComments();
    return res.send(comments);
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

async function getCommentByCommentId(req, res) {
  try {
    const commentId = req.params.commentId;
    const comment = await db.getCommentByCommentId(commentId);
    return res.send(comment);
  } catch(err) {
    console.error(err);
  }
}

async function updateComment(req, res) {
  try {
    const commentId = req.params.commentId;
    const data = {
      content: req.body.content,
    };
    const updatedComment = await db.updateComment(commentId, data);
    return res.send(updatedComment);
  } catch(err) {
    console.error(err);
  }
}

async function deleteComment(req, res) {
  try {
    const commentId = req.params.commentId;
    const deletedComment = await db.deleteComment(commentId);
    return res.send(deletedComment);
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  createComment,
  getAllComments,
  getCommentsByPostId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
}