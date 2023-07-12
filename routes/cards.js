const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  createCardValidator, cardIdValidator,
} = require('../validators/validators');

router.get('/cards', getCards);
router.post('/cards', createCardValidator, createCard);
router.delete('/cards/:cardId', cardIdValidator, deleteCard);
router.put('/cards/:cardId/likes', cardIdValidator, likeCard);
router.delete('/cards/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = router;
