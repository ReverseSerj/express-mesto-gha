const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  createCardValidator, cardIdValidator,
} = require('../validators/validators');

router.get('/cards', getCards);
router.post('/cards', createCard, createCardValidator);
router.delete('/cards/:cardId', deleteCard, cardIdValidator);
router.put('/cards/:cardId/likes', likeCard, cardIdValidator);
router.delete('/cards/:cardId/likes', dislikeCard, cardIdValidator);

module.exports = router;
