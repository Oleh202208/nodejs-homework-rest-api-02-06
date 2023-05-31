const errorMessageList = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  409: "Conflict",
};
class HttpError extends Error {
  constructor(statusCode, message = errorMessageList[statusCode]) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = {
  HttpError,
};
