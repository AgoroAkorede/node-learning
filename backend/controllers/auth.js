const { validationResult } = require("express-validator");
const User = require("../modals/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = error.array();
    throw Error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPasswword) => {
      const user = new User({
        email: email,
        password: hashedPasswword,
        name: name,
      });
      return user.save();
    })
    .then((result) => {
      res
        .statusCode(201)
        .json({ message: "User is Created!!", userId: result._id });
    })
    .catch((err) => {
      if (err.statusCode) {
        err.statusCode = 500;
      }
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this meail  sould not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = userbcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          mail: loadedUser.email,
          userId: loadedsUer._id.toString(),
        },
        "secret",
        { expiresIn: "1h" }
      );
      res
        .statues(200)
        .json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
