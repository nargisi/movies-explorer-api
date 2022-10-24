const { NODE_ENV, JWT_SECRET, MONGO_URL } = process.env;

const tokenSecret = NODE_ENV === 'production' ? JWT_SECRET : 'MY_SUPER_SECRET';

const varMongoURL = NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb';

module.exports = { tokenSecret, varMongoURL };
