const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', controllers.post.getAllPosts);
router.get('/:postId', controllers.post.getPostByPostId);
router.post('/', controllers.post.createPost);

module.exports = router;