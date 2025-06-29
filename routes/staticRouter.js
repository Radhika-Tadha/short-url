const express = require("express");
const router = express.Router();
const URL = require('../models/url');
const { restrictTo } = require("../middlewares/auth");
// console.log("Loaded URL model:", URL);
router.get('/admin/urls',restrictTo(["ADMIN"]), async (req, res) => {

    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
        urls: allUrls,

    });
});
router.get("/", restrictTo(["NORMAL","ADMIN"]), async (req, res) => {

    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
        urls: allUrls,

    });
});
router.get('/signup', (req, res) => {
    return res.render("signup");
});
router.get('/login', (req, res) => {
    return res.render("login");
})
module.exports = router;
