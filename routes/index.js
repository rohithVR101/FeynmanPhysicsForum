const express = require("express");
const Bcrypt = require("bcryptjs");
const passport = require("passport");
const member = require("../models/models").Member;
const User = require("../models/models").User;
const router = express.Router();

router.get("/", function (req, res) {
  res.render("pages/index", {
    current: "index",
    loginID: req.user,
  });
});

router.get("/members", function (req, res) {
  member.find((err, members) => {
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

router.post("/signup", (req, res) => {
  User.register(
    { username: req.body.username, active: false },
    req.body.password,
    function (err, user) {
      if (err) {
        res.render("pages/login", {
          current: "login",
          message: err,
          textcolor: "color: red;",
          loginID: user,
        });
      }
      var authenticate = User.authenticate();
      authenticate(req.body.username, req.body.password, function (
        err,
        result
      ) {
        if (err) {
          res.render("pages/login", {
            current: "login",
            message: err,
            textcolor: "color: red;",
            loginID: user,
          });
        } else {
          res.redirect("/");
        }
      });
    }
  );
});

router.post("/login", (req, res) => {
  let newuser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(newuser, function (err) {
    if (err) {
      res.render("pages/login", {
        current: "login",
        message: err,
        textcolor: "color: red;",
        loginID: user,
      });
    } else {
      var authenticate = User.authenticate();
      authenticate(req.body.username, req.body.password, function (
        err,
        result
      ) {
        if (err) {
          res.render("pages/login", {
            current: "login",
            message: err,
            textcolor: "color: red;",
            loginID: user,
          });
        } else {
          res.redirect("/");
        }
      });
    }
  });
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// router.post("/signup", async (req, res) => {
//   try {
//     let checkuser = await user
//       .findOne({
//         username: req.body.username,
//       })
//       .exec();
//     if (!checkuser) {
//       let salt = Bcrypt.genSaltSync(10);
//       req.body.password = Bcrypt.hashSync(req.body.password, salt);
//       let newuser = new user(req.body);
//       var result = await newuser.save();
//       console.log(result);
//       res.render("pages/login", {
//         current: "login",
//         message: "User Created. Login now!",
//         textcolor: "color: green;",
//         loginID: req.user,
//       });
//     } else {
//       res.render("pages/login", {
//         current: "login",
//         message: "Username in use. Choose a different one now!",
//         textcolor: "color: red;",
//         loginID: req.user,
//       });
//     }
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     let checkuser = await user
//       .findOne({
//         username: req.body.username,
//       })
//       .exec();
//     if (!checkuser) {
//       // console.log(req.body.username);
//       return res.render("pages/login", {
//         current: "login",
//         message: "The username does not exist!",
//         textcolor: "color: red;",
//         loginID: req.user,
//       });
//       // return res.status(400).send({ message: "The username does not exist" });
//     }
//     if (!Bcrypt.compareSync(req.body.password, checkuser.password)) {
//       return res.render("pages/login", {
//         current: "login",
//         message: "The password is invalid!",
//         textcolor: "color: red;",
//         loginID: req.user,
//       });
//       // return res.status(400).send({ message: "The password is invalid" });
//     }
//     console.log("The username and password combination is correct!");
//     req.user = checkuser;
//     res.redirect("/");
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
