const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createPost(data) {
  try {
    return await prisma.post.create({data});
  } catch(err) {
    console.error(err);
  }
}

async function getAllPosts() {
  try {
    return await prisma.post.findMany();
  } catch(err) {
    console.error(err);
  }
}

async function getPostByPostId(postId) {
  try {
    return await prisma.post.findUnique({
      where: {
        id: +postId,
      },
    });
  } catch(err) {
    console.error(err);
  }
}

async function updatePost(postId, data) {
  try {
    return await prisma.post.update({
      where: {
        id: +postId,
      },
      data,
    });
  } catch(err) {
    console.error(err);
  }
}

async function deletePostByPostId(postId) {
  try {
    return await prisma.post.delete({
      where: {
        id: +postId,
      },
    });
  } catch(err) {
    console.error(err);
  }
}

async function getAllUsers() {
  try {
    return await prisma.user.findMany();
  } catch(err) {
    console.error(err);
  }
}

async function createUser(data) {
  try {
    return await prisma.user.create({data});
  } catch(err) {
    console.error(err);
  }
}

async function getUserByUserId(userId) {
  try {
    return await prisma.user.findUnique({
      where: {
        id: +userId,
      },
    });
  } catch(err) {
    console.error(err);
  }
}

async function getUserByUsername(username) {
  try {
    return await prisma.user.findUnique({
      where: {
        username
      },
    });
  } catch(err) {
    console.error(err);
  }
}

async function getUserPostsByUserId(userId) {
  try {
    return await prisma.user.findUnique({
      where: {
        id: +userId,
      },
      include: {
        writtenPost: true,
      },
    });
  } catch(err) {
    console.error(err);
  }
}

async function updateUser(userId, data) {
  try {
    return await prisma.user.update({
      where: {
        id: +userId,
      },
      data
    });
  } catch(err) {
    console.error(err);
  }
}

async function deleteUserByUserId(userId) {
  try {
    return await prisma.user.delete({
      where: {
        id: +userId,
      },
    });
  } catch(err) {
    console.error(err);
  }
}

async function createComment(data) {
  try {
    return await prisma.comment.create({data});
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostByPostId,
  updatePost,
  deletePostByPostId,
  getAllUsers,
  createUser,
  getUserByUserId,
  getUserByUsername,
  getUserPostsByUserId,
  updateUser,
  deleteUserByUserId,
  createComment,
}