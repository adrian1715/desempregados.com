class CustomError extends Error {
  constructor({
    status = 500,
    message = "Internal Server Error",
    info = "Something went wrong.",
  }) {
    super(message);
    this.status = status;
    this.message = message;
    this.info = info;
  }
}

module.exports = CustomError;
