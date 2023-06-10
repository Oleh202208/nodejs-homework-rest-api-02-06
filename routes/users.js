const express = require("express");
const validateSchema = require("../decorators/validateSchema");
const authenticate = require("../decorators/authenticate");
const fileUpload = require("../decorators/fileUpload");
const {
  UserRegistrationSchema,
  UserLoginShema,
  UserUpdateSubscriptionSchema,
} = require("../schema/userSchema");
const {
  userRegister,
  userLogin,
  userLoguot,
  userGetCurrent,
  userUpdateSubscription,
  userUpdateAvatar,
} = require("../controllers/usersControlles");

const router = express.Router();

router
  .route("/register")
  .post(validateSchema(UserRegistrationSchema), userRegister);

router.route("/login").post(validateSchema(UserLoginShema), userLogin);

router.route("/logout").post(authenticate, userLoguot);

router.route("/current").post(authenticate, userGetCurrent);

router
  .route("/current/subscription")
  .patch(
    authenticate,
    validateSchema(UserUpdateSubscriptionSchema),
    userUpdateSubscription
  );

router
  .route("avatar")
  .patch(authenticate, fileUpload.single("avatar"), userUpdateAvatar);

module.exports = router;
