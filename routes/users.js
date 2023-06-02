const express = require("express");
const validateSchema = require("../decorators/validateSchema");
const authenticate = require("../decorators/authenticate");
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

module.exports = router;
