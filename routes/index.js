const express = require('express');
const members = require("../models/models").Member;
const router = express.Router();

router.get("/", function (req, res) {
    res.render('pages/index', {
        current: "index"
    })
});

router.get("/members", function (req, res) {
    res.render('pages/members', {
        current: "members",
        members: members.find()
    })
});

router.get("/mentors", function (req, res) {
    res.render('pages/mentors', {
        current: "mentors"
    })
});

router.get("/exchequer", function (req, res) {
    res.render('pages/exchequer', {
        current: "exchequer"
    })
});

router.get("/about", function (req, res) {
    res.render('pages/about', {
        current: "about"
    })
});

router.get("/login", function (req, res) {
    res.render('pages/login', {
        current: "login"
    })
});

module.exports = router;