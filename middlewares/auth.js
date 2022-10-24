const jwt = require('jsonwebtoken');
const { unathorizedErrReqMessage } = require('../constants');
const UnauthorizedError = require('../errors/unathorized-err');
const { tokenSecret } = require('../utils');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(unathorizedErrReqMessage));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, tokenSecret);
  } catch (err) {
    return next(new UnauthorizedError(unathorizedErrReqMessage));
  }

  req.user = payload;

  return next();
};
