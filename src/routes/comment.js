const { Router } = require('express');
const controllers = require('../controllers');

const router = Router({ mergeParams: true });

router.post('/', controllers.comment.createComment);
router.post('/:commentId', controllers.comment.createComment);

module.exports = router;