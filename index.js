require("dotenv").config();
const express = require("express");
const app = express();
var session = require("express-session");
const bodyParser = require("body-parser")
const routes = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.SECRET,
    proxy: true,
    resave: true,
    saveUninitialized: true }));
app.use(express.static("public"));
app.use("/", routes);

app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000, function () {
  console.log("Server running");
});
