const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const { errors } = require('celebrate');
const cors = require('cors');
const { celebrate, Joi } = require('celebrate');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./middlewares/handleErrors');
const { getMongoURL } = require('./utils');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());

mongoose.connect(getMongoURL(), {
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(
  cors({
    origin: ['https://movies.nargisi.nomoredomains.icu', 'http://localhost:3000'],
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/users', auth, userRoutes);
app.use('/movies', auth, movieRoutes);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().min(2).max(30),
      })
      .unknown(true),
  }),
  createUser,
);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена!'));
});

app.use(errorLogger);
app.use(errors());

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
