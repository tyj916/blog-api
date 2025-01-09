const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAllPosts() {
  try {
    return await prisma.post.findMany();
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

module.exports = {
  getAllPosts,
  createUser,
  getUserByUsername,
}