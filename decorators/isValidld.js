const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../utils/HttpError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  isValidObjectId(contactId)
    ? next()
    : next(new HttpError(404, `${contactId} is not valid id`));
};

module.exports = isValidId;
