const express = require("express");
const Bcrypt = require("bcryptjs");
const member = require("../models/models").Member;
const user = require("../models/models").User;
const router = express.Router();

router.get("/", function (req, res) {
  res.render("pages/index", {
    current: "index",
    loginID: req.session.user,
  });
});

router.get("/members", function (req, res) {
  member.find((err, members) => {
    res.render("pages/members", {
      current: "members",
      members: members,
      loginID: req.session.user,
    });
  });
});

router.get("/mentors", function (req, res) {
  res.render("pages/mentors", {
    current: "mentors",
    loginID: req.session.user,
  });
});

router.get("/exchequer", function (req, res) {
  res.render("pages/exchequer", {
    current: "exchequer",
    loginID: req.session.user,
  });
});

router.get("/about", function (req, res) {
  res.render("pages/about", {
    current: "about",
    loginID: req.session.user,
  });
});

router.get("/login", function (req, res) {
  res.render("pages/login", {
    current: "login",
    loginID: req.session.user,
  });
});

router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

router.post("/signup", async (req, res) => {
  try {
    let salt = Bcrypt.genSaltSync(10);
    req.body.password = Bcrypt.hashSync(req.body.password, salt);
    let newuser = new user(req.body);
    var result = await newuser.save();
    console.log(result);
    res.redirect("/login");
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let checkuser = await user
      .findOne({
        username: req.body.username,
      })
      .exec();
    if (!checkuser) {
      console.log(req.body.username);
      return res.status(400).send({ message: "The username does not exist" });
    }
    if (!Bcrypt.compareSync(req.body.password, checkuser.password)) {
      return res.status(400).send({ message: "The password is invalid" });
    }
    console.log("The username and password combination is correct!");
    req.session.user = checkuser;
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
});

module.exports = router;
