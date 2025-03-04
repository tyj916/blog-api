const { Router } = require('express');
const passport = require('passport');
const controllers = require('../controllers');

const router = Router();

router.get('/', controllers.post.getAllPosts);
router.get('/published', controllers.post.getPublishedPosts);
router.get('/author/id/:authorId', controllers.post.getPostsByAuthorId);
router.get('/author/username/:username', controllers.post.getPostsByAuthorUsername);
router.get('/:postId', controllers.post.getPostByPostId);

router.use(passport.authenticate('jwt', { session: false }));

router.post('/', controllers.post.createPost);
router.put('/:postId', controllers.post.updatePost);
router.delete('/:postId', controllers.post.deletePost);

module.exports = router;