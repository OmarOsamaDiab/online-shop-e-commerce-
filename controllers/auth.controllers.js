const authModel = require("../Models/auth.model");
const { validationResult } = require("express-validator");
exports.getSignup = async (req, res, next) => {
  res.render("signup", {
    authError: req.flash("authError")[0],
    validationErrors: req.flash("validationErrors"),
    isUser: false
  });
};

exports.getLogin = async (req, res, next) => {
  res.render("login", {
    authError: req.flash("authError")[0],
    validationErrors: req.flash("validationErrors"),
    isUser: false
  });
};

exports.postSignup = async (req, res, next) => {
  try {
    if (validationResult(req).array().length) {
      req.flash("validationErrors", validationResult(req).array());
      res.redirect("/signup");
    } else {
      const { username, email, password } = req.body;
      const result = await authModel.createUser(username, email, password);
      if (result) res.redirect("/login");
    }
  } catch (err) {
    req.flash("authError", err.message);
    res.redirect("/signup");
  }
};
exports.postLogin = async (req, res, next) => {
  try {
    const val = validationResult(req).array();
    if (val.length) {
      req.flash("validationErrors", val);
      res.redirect("/login");
    } else {
      const { email, password } = req.body;
      req.session.userId = await authModel.loginUser(email, password);
      res.redirect("/");
    }
  } catch (err) {
    req.flash("authError", err.message);
    res.redirect("/login");
  }
};
exports.logout = async (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
