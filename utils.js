const { NODE_ENV, JWT_SECRET } = process.env;

function getSecret() {
  return NODE_ENV === 'production' ? JWT_SECRET : 'MY_SUPER_SECRET';
}

module.exports = { getSecret };
