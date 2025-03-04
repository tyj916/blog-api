const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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

async function getUserPostsByUsername(username) {
  try {
    return await prisma.user.findUnique({
      where: {
        username,
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

module.exports = {
  getAllUsers,
  createUser,
  getUserByUserId,
  getUserByUsername,
  getUserPostsByUserId,
  getUserPostsByUsername,
  updateUser,
  deleteUserByUserId,
}
