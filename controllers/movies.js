const Movie = require('../models/movies');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ServerError = require('../errors/server-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch(() => next(new ServerError('Ошибка сервера!')));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные!'));
      } else next(new ServerError('Ошибка сервера!'));
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (movie === null) {
        next(new NotFoundError('Фильма с таким id не существует!'));
      } else if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Фильм удалять запрещено!'));
      } else {
        Movie.findByIdAndRemove(req.params.id)
          .then(() => res.send({ data: movie, message: 'DELETED' }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id!'));
      } else { next(new ServerError('Ошибка сервера!')); }
    });
};
