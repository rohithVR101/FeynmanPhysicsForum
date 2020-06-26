const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/", routes);


app.listen(process.env.PORT || 3000, function () {
  console.log("Server running");
});
