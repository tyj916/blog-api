const { Router } = require('express');
const auth = require('./auth');
const post = require('./post');
const user = require('./user');
const comment = require('./comment');

const router = Router();

router.use('/', auth);
router.use('/posts', post);
router.use('/users', user);
router.use('/posts/:postId/comments', comment);

module.exports = router;