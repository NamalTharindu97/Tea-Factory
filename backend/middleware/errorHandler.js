const { constants } = require("../constant");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  // log the full stack server-side, but never leak it to clients
  if (statusCode === 500) {
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${statusCode}`);
    console.error(err.stack);
  }

  if (res.headersSent) {
    return next(err);
  }

  let title = "Error";
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      title = "Validation Failed";
      break;
    case constants.NOT_FOUND:
      title = "Not Found";
      break;
    case constants.UNAUTHORIZED:
      title = "Unauthorized";
      break;
    case constants.FORBIDDEN:
      title = "Forbidden";
      break;
    case constants.SERVER_ERROR:
      title = "Server Error";
      break;
    default:
      break;
  }

  res.status(statusCode).json({ title, message: err.message });
};

module.exports = errorHandler;
