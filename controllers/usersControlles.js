const ctrWrapper = require("../decorators/ctrWrapper");
const {
  createNewUser,
  verifyUserEmail,
  resendVerifyUserEmail,
  loginCurrentUser,
  logoutCurrentUser,
  changeUserSubscription,
  changeUserAvatar,
} = require("../services/usersServices");

const userRegister = async (req, res, next) => {
  const newUser = await createNewUser(req.body);
  res.status(201).json(newUser);
};

const userVerifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  await verifyUserEmail(verificationToken);
  res.status(200).json({ message: "Verefication success" });
};

const userResendVerifyEmail = async (req, res, next) => {
  await resendVerifyUserEmail(req.body);
  res.status(200).json({ message: "Verification email is send" });
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

const userUpdateAvatar = async (req, res, next) => {
  const newAvatarURL = await changeUserAvatar(req.file, req.user);
  res.status(200).json(newAvatarURL);
};

module.exports = {
  userRegister: ctrWrapper(userRegister),
  userVerifyEmail: ctrWrapper(userVerifyEmail),
  userResendVerifyEmail: ctrWrapper(userResendVerifyEmail),
  userLogin: ctrWrapper(userLogin),
  userLoguot: ctrWrapper(userLoguot),
  userGetCurrent: ctrWrapper(userGetCurrent),
  userUpdateSubscription: ctrWrapper(userUpdateSubscription),
  userUpdateAvatar: ctrWrapper(userUpdateAvatar),
};
