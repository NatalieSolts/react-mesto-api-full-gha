const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  getMe,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

const { userIdValidate, userInfoValidate, userAvatarValidate } = require('../middlewares/validators/userValidators');

// GET /users — возвращает всех пользователей
router.get('/', getAllUsers);

// возвращает информацию о текущем пользователе
router.get('/me', getMe);

// GET /users/:userId - возвращает пользователя по _id
router.get('/:userId', userIdValidate, getUser);

// PATCH /users/me — обновляет профиль
router.patch('/me', userInfoValidate, updateUserInfo);

// PATCH /users/me/avatar — обновляет аватар
router.patch('/me/avatar', userAvatarValidate, updateUserAvatar);

module.exports = router;
