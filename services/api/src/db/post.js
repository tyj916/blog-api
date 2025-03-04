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
    return await prisma.post.findMany({
      include: {
        author: {
          select: {
            displayName: true,
            username: true,
          }
        },
      },
    });
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
      include: {
        author: {
          select: {
            id: true,
            displayName: true,
            username: true,
          }
        },
        comment: {
          include: {
            author: {
              select: {
                id: true,
                displayName: true,
                username: true,
              }
            }
          }
        },
      },
    });
  } catch(err) {
    console.error(err);
  }
}

function getOrderBy(query) {
  switch (query) {
    case 'recent':
      return [
        {
          createdAt: 'desc',
        }
      ];
    case 'oldest':
      return [
        {
          createdAt: 'asc',
        }
      ];
    case 'popularity':
      return [
        {
          upvotedUser : {
            _count: 'desc',
          }
        },
        {
          createdAt: 'desc',
        }
      ]
  }
}

async function getPublishedPosts(limit, sortBy = 'recent') {
  try {
    return await prisma.post.findMany({
      where: {
        status: 'Published' || 'published',
      },
      take: +limit || undefined,
      orderBy: getOrderBy(sortBy),
      include: {
        author: {
          select: {
            displayName: true,
            username: true,
          }
        },
      }
    })
  } catch(err) {
    console.error(err);
  }
}

async function getPostsByAuthorId(authorId) {
  try {
    return await prisma.post.findMany({
      where: {
        authorId: +authorId,
      }
    })
  } catch(err) {
    console.error(err);
  }
}

async function getPostsByAuthorUsername(username) {
  try {
    return await prisma.post.findMany({
      where: {
        author: {
          username,
        }
      }
    })
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

module.exports = {
  createPost,
  getAllPosts,
  getPostByPostId,
  getPublishedPosts,
  getPostsByAuthorId,
  getPostsByAuthorUsername,
  updatePost,
  deletePostByPostId,
}