const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./utils/errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().default('Жак-Ив Кусто').min(2).max(30),
    about: Joi.string().default('Исследователь').min(2).max(30),
    avatar: Joi.string().regex(/^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i)
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Извините, запрашиваемая страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .json({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`Server start listening on port ${PORT}`);
});
