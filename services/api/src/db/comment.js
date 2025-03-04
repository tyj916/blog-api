const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createComment(data) {
  try {
    return await prisma.comment.create({data});
  } catch(err) {
    console.error(err);
  }
}

async function getAllComments() {
  try {
    return await prisma.comment.findMany();
  } catch(err) {
    console.error(err);
  }
}

async function getCommentsByPostId(postId) {
  try {
    return await prisma.comment.findMany({
      where: {
        postId: +postId,
      },
    });
  } catch(err) {
    console.error(err);
  }
}

async function getCommentByCommentId(commentId) {
  try {
    return await prisma.comment.findUnique({
      where: {
        id: +commentId,
      },
      include: {
        child: true,
      }
    });
  } catch(err) {
    console.error(err);
  }
}

async function getCommentsByAuthorId(authorId) {
  try {
    return await prisma.comment.findMany({
      where: {
        authorId: +authorId
      }
    });
  } catch(err) {
    console.error(err);
  }
}

async function updateComment(commentId, data) {
  try {
    return await prisma.comment.update({
      where: {
        id: +commentId,
      },
      data
    });
  } catch(err) {
    console.error(err);
  }
}

async function deleteComment(commentId) {
  try {
    return await prisma.comment.delete({
      where: {
        id: +commentId,
      },
    });
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  createComment,
  getAllComments,
  getCommentsByPostId,
  getCommentByCommentId,
  getCommentsByAuthorId,
  updateComment,
  deleteComment,
}