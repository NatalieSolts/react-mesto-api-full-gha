const router = require('express').Router();

const signin = require('./signin');
const signup = require('./signup');
const users = require('./users');
const cards = require('./cards');
const NotFoundError = require('../utils/errors/NotFoundError');
const { logout } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.use('/signin', signin);
router.use('/signup', signup);

router.post('/sign-out', logout);
router.use('/users', auth, users);
router.use('/cards', auth, cards);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
