const Card = require('../models/card');
const { CREATED_CODE } = require('../utils/constants');
const ForbiddenError = require('../utils/errors/ForbiddenError');

// GET /cards — возвращает все карточки
module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

// POST /cards — создаёт карточку
module.exports.createCard = (req, res, next) => {
  const id = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: id })
    .then((card) => res.status(CREATED_CODE).send({ data: card }))
    .catch(next);
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
    .catch(next);
};

// PUT /cards/:cardId/likes — поставить лайк карточке
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch(next);
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch(next);
};
