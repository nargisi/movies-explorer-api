module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(err.statusCode).send({ message: err.message });
};
