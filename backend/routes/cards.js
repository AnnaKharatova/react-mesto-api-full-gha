const router = require('express').Router();
const {
  getCards, deleteCard, createCard, addCardLike, removeCardLike,
} = require('../controllers/cards');
const { validateCardId, validateCardCreation } = require('../utils/validation');

router.get('/', getCards);

router.delete('/:cardId', validateCardId, deleteCard);

router.post('/', validateCardCreation, createCard);

router.put('/:cardId/likes', validateCardId, addCardLike);

router.delete('/:cardId/likes', validateCardId, removeCardLike);

module.exports = router;
