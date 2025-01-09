const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.post('/', controllers.user.createUser);

module.exports = router;