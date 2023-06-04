const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;

const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;

const NotFoundError = require('../utils/errors/NotFoundError');
const IncorrectDataError = require('../utils/errors/IncorrectDataError');
const ConflictError = require('../utils/errors/ConflictError');

const { CREATED_CODE } = require('../utils/constants');

const User = require('../models/user');

// GET /users — возвращает всех пользователей
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, id, next) => {
  User.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError('В базе данных не найден пользователь с данным ID.'));
      }
      if (err instanceof CastError) {
        next(new IncorrectDataError('Передан некорректный ID пользователя.'));
      }
      next(err);
    });
};

// возвращает информацию о текущем пользователе
module.exports.getMe = (req, res, next) => {
  const id = req.user._id;
  getUserById(req, res, id, next);
};

// GET /users/:userId - возвращает пользователя по _id
module.exports.getUser = (req, res, next) => {
  const id = req.params.userId;
  getUserById(req, res, id, next);
};

// POST /users — создаёт пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.status(CREATED_CODE).send(userData);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectDataError('Переданы некорректные данные для создания пользователя.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Указанный email уже зарегистрирован. Пожалуйста используйте другой email'));
      } else {
        next(err);
      }
    });
};

const updateInfo = (req, res, dataToUpdate, next) => {
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    dataToUpdate,
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(`В базе данных не найден пользователь с ID: ${req.user._id}.`));
      } else if (err instanceof ValidationError) {
        next(new IncorrectDataError('Переданы некорректные данные для редактирования профиля.'));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me — обновляет профиль
module.exports.updateUserInfo = (req, res, next) => {
  const userData = req.body;
  updateInfo(req, res, userData, next);
};

// PATCH /users/me/avatar — обновляет аватар
module.exports.updateUserAvatar = (req, res, next) => {
  const newAvatarLink = req.body;
  updateInfo(req, res, newAvatarLink, next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY : 'secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3600000 * 24 * 7,
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectDataError('Переданы некорректные данные для входа.'));
      }
      next(err);
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из системы' });
};
