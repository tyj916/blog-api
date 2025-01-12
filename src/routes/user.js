const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', controllers.user.getAllUsers);
router.get('/:userId', controllers.user.getUserByUserId);
router.post(
  '/', 
  controllers.auth.hashPassword,
  controllers.user.createUser,
);
router.delete('/:userId', controllers.user.deleteUser);

module.exports = router;