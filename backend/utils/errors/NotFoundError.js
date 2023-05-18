const { NOT_FOUND_ERROR } = require('../constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR;
  }
}

module.exports = NotFoundError;
