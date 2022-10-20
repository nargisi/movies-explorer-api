const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT = 409;
const SERVER_ERROR_CODE = 500;
const patternURL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND_ERROR_CODE,
  CONFLICT,
  SERVER_ERROR_CODE,
  patternURL,
};
