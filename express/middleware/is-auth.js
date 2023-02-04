module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirecet("/login");
  }
  next();
};
