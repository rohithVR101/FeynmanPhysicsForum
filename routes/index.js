const express = require("express");
const passport = require("passport");
const User = require("../models/models").User;
const router = express.Router();

router.get("/", function (req, res) {
  // console.log(req.user);
  res.render("pages/index", {
    current: "index",
    loginID: req.user,
  });
});

router.get("/members", function (req, res) {
  User.find((err, members) => {
    res.render("pages/members", {
      current: "members",
      members: members,
      loginID: req.user,
    });
  });
});

router.get("/mentors", function (req, res) {
  res.render("pages/mentors", {
    current: "mentors",
    loginID: req.user,
  });
});

router.get("/exchequer", function (req, res) {
  res.render("pages/exchequer", {
    current: "exchequer",
    loginID: req.user,
  });
});

router.get("/about", function (req, res) {
  res.render("pages/about", {
    current: "about",
    loginID: req.user,
  });
});

router.get("/login", function (req, res) {
  res.render("pages/login", {
    current: "login",
    message: "",
    textcolor: "color: black;",
    loginID: req.user,
  });
});


router.post("/signup", function (req, res) {
  User.register({ username: req.body.username }, req.body.password, function (
    err,
    user
  ) {
    if (err) {
      res.render("pages/login", {
        current: "login",
        message: err,
        textcolor: "color: red;",
        loginID: user,
      });
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    }
  });
});

router.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      res.render("pages/login", {
        current: "login",
        message: err,
        textcolor: "color: red;",
        loginID: user,
      });
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    }
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
