const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const { validationLogin, validationCreateUser } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-err');
const { notFoundPageErrMessage } = require('../constants');

router.post(
  '/signin',
  validationLogin,
  login,
);
router.post(
  '/signup',
  validationCreateUser,
  createUser,
);
router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

router.use(auth, (req, res, next) => {
  next(new NotFoundError(notFoundPageErrMessage));
});

module.exports = router;
