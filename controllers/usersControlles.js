const ctrWrapper = require("../decorators/ctrWrapper");
const {
  createNewUser,
  loginCurrentUser,
  logoutCurrentUser,
  changeUserSubscription,
} = require("../services/usersServices");

const userRegister = async (req, res, next) => {
  const newUser = await createNewUser(req.body);
  res.status(201).json(newUser);
};

const userLogin = async (req, res, next) => {
  const currentUser = await loginCurrentUser(req.body);
  res.status(200).json(currentUser);
};

const userLoguot = async (req, res, next) => {
  await logoutCurrentUser(req.user);
  res.status(204);
};

const userGetCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const userUpdateSubscription = async (req, res, next) => {
  const changedUserSubscription = await changeUserSubscription(
    req.body,
    req.user
  );
  res.status(200).json(changedUserSubscription);
};

module.exports = {
  userRegister: ctrWrapper(userRegister),
  userLogin: ctrWrapper(userLogin),
  userLoguot: ctrWrapper(userLoguot),
  userGetCurrent: ctrWrapper(userGetCurrent),
  userUpdateSubscription: ctrWrapper(userUpdateSubscription),
};
