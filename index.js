require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bodyParser = require("body-parser");
const routes = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SECRET,
    proxy: true,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use("/", routes);

app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000, function () {
  console.log("Server running");
});
