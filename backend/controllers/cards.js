const mongoose = require('mongoose');
const Card = require('../models/card');
const {
  BadRequestError, ForbiddenError, NotFoundError,
} = require('../utils/errors/index-errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId).orFail()
    .then((card) => {
      if (req.user._id !== card.owner) {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      return card.deleteOne();
    })
    .then(() => res.send({ message: 'Карточка успешно удалена' }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
      return next(err);
    });
};

module.exports.addCardLike = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
).orFail()
  .then((card) => {
    res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Карточка с указанным _id не найдена.'));
    }
    return next(err);
  });

module.exports.removeCardLike = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).orFail()
  .then((card) => {
    res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Карточка с указанным _id не найдена.'));
    }
    return next(err);
  });
