const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unathorized-err');
const { getSecret } = require('../utils');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация!'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, getSecret());
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация!'));
  }

  req.user = payload;

  return next();
};
