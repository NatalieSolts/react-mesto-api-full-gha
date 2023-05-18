const router = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { cardDataValidate, cardIdValidate } = require('../middlewares/validators/cardValidators');

// GET /cards — возвращает все карточки
router.get('/', getAllCards);

// POST /cards — создаёт карточку
router.post('/', cardDataValidate, createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete('/:cardId', cardIdValidate, deleteCard);

// PUT /cards/:cardId/likes — поставить лайк карточке
router.put('/:cardId/likes', cardIdValidate, likeCard);

// DELETE /cards/:cardId/likes — убрать лайк с карточки
router.delete('/:cardId/likes', cardIdValidate, dislikeCard);

module.exports = router;
