const express = require("express");
const passport = require("passport");
const User = require("../models/models").User;
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index", {
    current: "index",
    loginID: req.user,
  });
});

router.get("/members", (req, res) => {
  User.find((err, members) => {
    res.render("pages/members", {
      current: "members",
      members: members,
      loginID: req.user,
    });
  });
});

router.get("/mentors", (req, res) => {
  res.render("pages/mentors", {
    current: "mentors",
    loginID: req.user,
  });
});

router.get("/exchequer", (req, res) => {
  res.render("pages/exchequer", {
    current: "exchequer",
    loginID: req.user,
  });
});

router.get("/about", (req, res) => {
  res.render("pages/about", {
    current: "about",
    loginID: req.user,
  });
});

router.post("/signup", (req, res) => {
  User.register(
    {
      username: req.body.username,
      email: req.body.email,
      name: req.body.username,
    },
    req.body.password,
     (err, user) => {
      if (err) {
        res.render("pages/login", {
          current: "login",
          message: err,
          textcolor: "color: red;",
          loginID: user,
        });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/finish");
        });
      }
    }
  );
});

router
  .route("/finish")
  .get((req, res) => {
    res.render("pages/finish", {
      current: "login",
      loginID: req.user,
    });
  })
  .post((req, res) => {
    User.findById(req.user._id, (err, founduser) => {
      if (err) {
      } else {
        founduser.username = req.body.username;
        founduser.batch = req.body.batch;
        founduser.profession = req.body.profession;
        founduser.save((err, doc) => {
          if (err) return console.error(err);
          res.redirect("/");
        });
      }
    });
  });

router
  .route("/login")
  .get((req, res) => {
    res.render("pages/login", {
      current: "login",
      message: "",
      textcolor: "color: black;",
      loginID: req.user,
    });
  })
  .post((req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    req.login(user, (err) => {
      if (err) {
        res.render("pages/login", {
          current: "login",
          message: err,
          textcolor: "color: red;",
          loginID: user,
        });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/");
        });
      }
    });
  });

// Google oauth 2.0 routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    if (!req.user.email) {
      return res.redirect("/finish");
    }
    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
