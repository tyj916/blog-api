const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', controllers.post.getAllPosts);
router.get('/:postId', controllers.post.getPostByPostId);
router.post('/', controllers.post.createPost);
router.put('/:postId', controllers.post.updatePost);
router.delete('/:postId', controllers.post.deletePost);

module.exports = router;