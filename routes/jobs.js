const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const Career = require("../models/Career");

const { truncateToLastWord } = require("../utils/string");
const Job = require("../models/Job");

// list page
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  const companies = await Company.find();
  const careers = await Career.find();
  res.render("jobs/index", {
    jobs,
    companies,
    careers,
    truncateToLastWord,
    scripts: ["/js/jobs/index.js"],
  });
});

// render "add job" page with companies and careers
router.get("/adicionar", async (req, res) => {
  const careers = await Career.find();
  res.render("jobs/new", { careers, scripts: ["/js/jobs/new.js"] });
});

module.exports = router;
