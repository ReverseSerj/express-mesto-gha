const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const {
  getUserValidator, updateProfileValidator, updateAvatarValidator,
} = require('../validators/validators');

router.get('/users/me', getCurrentUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUserValidator, getUser);
router.post('/users', createUser);
router.patch('/users/me', updateProfileValidator, updateProfile);
router.patch('/users/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = router;
