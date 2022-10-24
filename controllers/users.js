const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unathorized-err');
const ServerError = require('../errors/server-err');
const ConflictError = require('../errors/conflict-err');
const {
  notFoundErrMessage, BadRequestErrMessage, serverErrMessage,
  conflictErrMessage, unathorizedErrMessage,
} = require('../constants');
const { tokenSecret } = require('../utils');

module.exports.getAboutUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        next(new NotFoundError(notFoundErrMessage));
      } else res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BadRequestErrMessage));
      } else {
        next(new ServerError(serverErrMessage));
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(conflictErrMessage));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(BadRequestErrMessage));
      } else {
        next(new ServerError(serverErrMessage));
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    })
      .then((user) => {
        res.send({ data: user });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError(conflictErrMessage));
        } else if (err.name === 'ValidationError') {
          next(new BadRequestError(BadRequestErrMessage));
        } else {
          next(new ServerError(serverErrMessage));
        }
      }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError(unathorizedErrMessage));
      }
      return bcrypt.compare(password, user.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError(unathorizedErrMessage));
          }
          const token = jwt.sign(
            { _id: user._id },
            tokenSecret,
            { expiresIn: '7d' },
          );

          res.send({ data: token });
        });
    })
    .catch(() => {
      next(new ServerError(serverErrMessage));
    });
};
