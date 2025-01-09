const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAllPosts() {
  try {
    return await prisma.post.findMany();
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  getAllPosts,
}