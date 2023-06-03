const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;
const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/NotFoundError');
const IncorrectDataError = require('../utils/errors/IncorrectDataError');

const Card = require('../models/card');
const { CREATED_CODE } = require('../utils/constants');

// GET /cards — возвращает все карточки
module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// POST /cards — создаёт карточку
module.exports.createCard = (req, res, next) => {
  const id = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: id })
    .then((card) => res.status(CREATED_CODE).send(card))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectDataError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      const owner = card.owner.toString();
      if (req.user._id === owner) {
        card.deleteOne()
          .then(() => res.send({ message: 'Карточка успешно удалена.' }))
          .catch(next);
      } else {
        next(new ForbiddenError('Нельзя удалять чужие карточки.'));
      }
    })
    // .catch(next);
    // })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(`В базе данных не найдена карточка с ID: ${req.params.cardId}.`));
      } else if (err instanceof CastError) {
        next(new IncorrectDataError(`Передан некорректный ID карточки: ${req.params.cardId}.`));
      } else {
        next(err);
      }
    });
};

const cardLikesUpdate = (req, res, updateData, next) => {
  Card.findByIdAndUpdate(req.params.cardId, updateData, { new: true })
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError('Такая карточка не найдена'));
      } else if (err instanceof CastError) {
        next(new IncorrectDataError('Карточки не существует'));
      } else {
        next(err);
      }
    });
};

// PUT /cards/:cardId/likes — поставить лайк карточке
module.exports.likeCard = (req, res, next) => {
  const updateData = { $addToSet: { likes: req.user._id } };
  cardLikesUpdate(req, res, updateData, next);
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
module.exports.dislikeCard = (req, res, next) => {
  const updateData = { $pull: { likes: req.user._id } };
  cardLikesUpdate(req, res, updateData, next);
};
