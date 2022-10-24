const Movie = require('../models/movies');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ServerError = require('../errors/server-err');
const {
  serverErrMessage, BadRequestErrMessage, notFoundErrMessage, ForbiddenErrMessage,
} = require('../constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch(() => next(new ServerError(serverErrMessage)));
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({
    ...req.body, owner: req.user._id,
  })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BadRequestErrMessage));
      } else next(new ServerError(serverErrMessage));
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (movie === null) {
        return next(new NotFoundError(notFoundErrMessage));
      } if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError(ForbiddenErrMessage));
      }
      return Movie.findByIdAndRemove(req.params.id)
        .then(() => {
          res.send({ data: movie, message: 'DELETED' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BadRequestErrMessage));
      } else { next(new ServerError(serverErrMessage)); }
    });
};
