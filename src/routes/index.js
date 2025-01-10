const { Router } = require('express');
const post = require('./post');
const user = require('./user');
const comment = require('./comment');

const router = Router();

router.use('/posts', post);
router.use('/users', user);
router.use('/posts/:postId/comments', comment);

module.exports = router;