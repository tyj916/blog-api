const db = require('../db');

async function createComment(req, res) {
  try {
    const data = {
      content: req.body.content,
      postId: +req.params.postId,
      authorId: req.user.id,
    }
    const comment = await db.createComment(data);
    return res.send(comment);
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  createComment,
}