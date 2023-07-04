const Card = require('../models/card');
const ERROR_STATUS = require('../data/err');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(ERROR_STATUS.SERVER_ERROR).send({ message: 'Что-то пошло не так' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_STATUS.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(ERROR_STATUS.SERVER_ERROR).send({ message: 'Что-то пошло не так' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_STATUS.NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_STATUS.BAD_REQUEST).send({ message: 'Ошибка в id карточки' });
      } else {
        res.status(ERROR_STATUS.SERVER_ERROR).send({ message: 'Что-то пошло не так' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(ERROR_STATUS.NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_STATUS.BAD_REQUEST).send({ message: 'Ошибка в id карточки' });
      } else {
        res.status(ERROR_STATUS.SERVER_ERROR).send({ message: 'Что-то пошло не так' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_STATUS.NOT_FOUND).send({ message: 'Передан несуществующий id карточки' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_STATUS.BAD_REQUEST).send({ message: 'Ошибка в id карточки' });
      } else {
        res.status(ERROR_STATUS.SERVER_ERROR).send({ message: 'Что-то пошло не так' });
      }
    });
};
