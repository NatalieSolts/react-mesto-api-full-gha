const { BAD_REQUEST_ERROR } = require('../constants');

class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR;
  }
}

module.exports = IncorrectDataError;
