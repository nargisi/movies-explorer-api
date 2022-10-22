const { NODE_ENV, JWT_SECRET, MONGO_URL } = process.env;

function getSecret() {
  return NODE_ENV === 'production' ? JWT_SECRET : 'MY_SUPER_SECRET';
}

function getMongoURL() {
  return NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/bitfilmsdb';
}

module.exports = { getSecret, getMongoURL };
