const { Router } = require('express');
const passport = require('passport');
const controllers = require('../controllers');

const router = Router();

router.get('/', controllers.user.getAllUsers);
router.get('/id/:userId', controllers.user.getUserByUserId);
router.get('/username/:username', controllers.user.getUserByUsername);
router.get('/:authorId/comments', controllers.comment.getCommentsByAuthorId);

router.use(passport.authenticate('jwt', { session: false }));

router.post('/', controllers.auth.handleRegister, controllers.auth.hashPassword, controllers.user.createUser);
router.put('/:userId', controllers.auth.hashPassword, controllers.user.updateUser);
router.delete('/:userId', controllers.user.deleteUser);

module.exports = router;