const { Router } = require('express');
const passport = require('passport');
const controllers = require('../controllers');

const router = Router({ mergeParams: true });

router.get('/', controllers.comment.getCommentsByPostId);
router.get('/:commentId', controllers.comment.getCommentByCommentId);

router.use(passport.authenticate('jwt', { session: false }));

router.post('/', controllers.comment.createComment);
router.post('/:commentId', controllers.comment.createComment);
router.put('/:commentId', controllers.comment.updateComment);
router.delete('/:commentId', controllers.comment.deleteComment);

module.exports = router;