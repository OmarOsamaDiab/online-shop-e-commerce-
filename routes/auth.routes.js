const router = require("express").Router();
const { check } = require("express-validator");
const authControllers = require("../controllers/auth.controllers");
const auth = require('../middlewares/isAuth')
router.get("/signup", auth.notAuth, authControllers.getSignup);
router.get("/login", auth.notAuth, authControllers.getLogin);
router.post(
  "/signup",
  auth.notAuth,
  check("username")
    .isLength({ min: 5 })
    .withMessage("user name must be at least 5 letters"),
  check("email").isEmail().withMessage("Invalid Email"),
  check("password").not().isEmpty().withMessage("password is required"),
  check("confirmedPassword").custom((val, { req }) => {
    if (val === req.password) return true;
    throw "passwords do not match";
  }),
  authControllers.postSignup
);
router.post(
  "/login",
  auth.notAuth,
  check("email").isEmail().withMessage("Invalid Email"),
  check("password").not().isEmpty().withMessage("password is required"),
  authControllers.postLogin
);
router.all("/logout", authControllers.logout);
module.exports = router;
