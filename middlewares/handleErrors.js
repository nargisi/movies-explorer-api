// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, _) => {
  res.status(err.statusCode).send({ message: err.message });
};
