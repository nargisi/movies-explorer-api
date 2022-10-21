// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
};
