const router = require('express').Router();
const { Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const {
  getMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');

const { validationDeleteMovieById, validationCreateMovie } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', validationCreateMovie, createMovie);
router.delete('/:id', validationDeleteMovieById, deleteMovieById);

module.exports = router;
