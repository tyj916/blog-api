const { Router } = require('express');
const controllers = require('../controllers');

const router = Router({ mergeParams: true });

router.post('/', controllers.comment.createComment);
router.post('/:commentId', controllers.comment.createComment);
router.get('/', controllers.comment.getCommentsByPostId);
router.get('/:commentId', controllers.comment.getCommentByCommentId);
router.put('/:commentId', controllers.comment.updateComment);
router.delete('/:commentId', controllers.comment.deleteComment);

module.exports = router;