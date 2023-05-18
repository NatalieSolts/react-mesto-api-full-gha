const router = require('express').Router();
const { login } = require('../controllers/users');
const { userSignInValidate } = require('../middlewares/validators/userValidators');

router.post('/', userSignInValidate, login);

module.exports = router;
