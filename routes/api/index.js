const express = require("express");
const router = express.Router();

const methodOverride = require("method-override");

// BASIC API CONFIG
router.use(express.json()); // enable middleware to parse body of Content-type: application/json
router.use(express.urlencoded({ extended: true })); // Middleware to handle form-urlencoded requests
router.use(methodOverride("_method")); // Middleware to handle PUT and DELETE requests from forms

router.get("/", (req, res) => res.send("it's alive!"));

// API ROUTES
router.use("/companies", require("./companies"));
router.use("/careers", require("./careers"));
router.use("/careerPages", require("./careerPages"));

module.exports = router;
