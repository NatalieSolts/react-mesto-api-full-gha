const { DEFAULT_ERROR } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || DEFAULT_ERROR;
  const errorMessage = statusCode === DEFAULT_ERROR ? `На сервере произошла ошибка. ${err.name}: ${err.message}` : err.message;
  res.status(statusCode).send({
    message: errorMessage,
  });
  return next();
};
