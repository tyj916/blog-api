const { Router } = require('express');
const controllers = require('../controllers');

const router = Router({ mergeParams: true });

router.post('/', controllers.comment.createComment);

module.exports = router;