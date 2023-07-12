const router = require('express').Router();
const {
  getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

const {
  getUserValidator, updateProfileValidator, updateAvatarValidator,
} = require('../validators/validators');

router.get('/users/me', getCurrentUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUser, getUserValidator);
router.patch('/users/me', updateProfile, updateProfileValidator);
router.patch('/users/me/avatar', updateAvatar, updateAvatarValidator);

module.exports = router;
