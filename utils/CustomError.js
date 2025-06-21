class CustomError extends Error {
  constructor(message = "Internal Server Error", status = 500, info) {
    super(message);
    this.status = status;
    this.message = message;
    this.info = info; // something went wrong
  }
}

module.exports = CustomError;
