const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.post('/', controllers.user.createUser);
router.delete('/:userId', controllers.user.deleteUser);

module.exports = router;