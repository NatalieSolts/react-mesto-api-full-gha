const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { userSignUpValidate } = require('../middlewares/validators/userValidators');

router.post('/', userSignUpValidate, createUser);

module.exports = router;
