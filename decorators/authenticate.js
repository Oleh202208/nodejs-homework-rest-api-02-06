const { HttpError } = require("../utils/HttpError");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { autorization = "" } = req.heders;
  const [bearer, token] = autorization.split(" ");
  if (bearer !== "Bearer") {
    next(new HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(new HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch {
    next(new HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
