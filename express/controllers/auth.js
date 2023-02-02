const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: true,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("63d95282505d45f60c75f60d").then((user) => {
    req.session.isLoggedIn = true;
    req.session.user = user;

    res.redirect("/");
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/")
  });
};
