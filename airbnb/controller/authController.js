const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrupt = require("bcryptjs");
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup ",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      usertype: "",
    },
    user: {},
  });
};

exports.postSignup = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must atleast 2 characters")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name can only contain letters"),
  check("lastName")
    .trim()
    .matches(/^[a-zA-Z]*$/)
    .withMessage("First name can only contain letters"),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid e-mail")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must atleast 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must atleast contain one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must atleast contain one uppercase letter")
    .matches(/[!@#$%^&*()]/)
    .withMessage("Password must atleast contain one special character")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),
  check("usertype")
    .notEmpty()
    .withMessage("User type must required")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),
  check("terms")
    .notEmpty()
    .withMessage("you must accept the terms and conditions")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("you must click on the checkbox");
      }
      return true;
    }),

  (req, res, next) => {
    const { firstName, lastName, email, password, usertype } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, password, usertype },
        user:{},
      });
    }
    bcrupt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          usertype,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log("Error while saving user", err);
        return res.status(404).render("auth/signup", {
          pageTitle: "Signup",
          currentPage: "signup",
          isLoggedIn: false,
          errors: [err.messsage],
          oldInput: { firstName, lastName, email, password, usertype },
          user:{},
        });
      });
  },
];
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Add Login ",
    currentPage: "login",
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
    user:{},
  });
};

exports.postLogin = async (req, res, next) => {
  // res.session("inLoddedIn",true);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["User does not exist"],
      oldInput: { email },
      user:{}
    });
  }
  const isMatch = await bcrupt.compare(password, user.password);
  if (!isMatch) {
    return res.render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["wrong password"],
      oldInput: { email },
      user:{}
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  // req.isLoggedIn = true;
  await req.session.save();
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.redirect("/login");
  });
};
