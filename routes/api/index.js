const express = require("express");
const router = express.Router();

// enable middleware to parse body of Content-type: application/json
router.use(express.json());

// Middleware to handle form-urlencoded requests
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => res.send("it's alive!"));

router.use("/companies", require("./companies"));
router.use("/careers", require("./careers"));
router.use("/careerPages", require("./careerPages"));

module.exports = router;
