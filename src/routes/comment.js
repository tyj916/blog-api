const { Router } = require('express');
const controllers = require('../controllers');

const router = Router({ mergeParams: true });

router.post('/', controllers.comment.createComment);
router.post('/:commentId', controllers.comment.createComment);
router.get('/', controllers.comment.getCommentsByPostId);

module.exports = router;