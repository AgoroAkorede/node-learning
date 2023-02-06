const express = require("express");
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");

const User = require("../models/user");

const router = express.Router();

router.get(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please Enter a Valid email")
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with a text and at least 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.getLogin
);

router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please Enter a Valid email")
      .custom((value, { req }) => {
        if (value === "test@test.com") {
          throw new Error("This email address is forbidden");
        }
        return true;
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with a text and at least 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        //   if (value !== req.body.password) {
        //     throw new Error("Passwords have ro match");
        //   }
        //   return true;

        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Email exists alreasy, please pick adifferent one."
            );
          }
        });
      }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.post("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
