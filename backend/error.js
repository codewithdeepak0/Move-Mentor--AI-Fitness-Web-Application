// error.js
class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const createError = (status, message) => {
  return new CustomError(status, message);
};

module.exports = {
  createError,
};
