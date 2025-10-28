const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Company = require("../models/Company");
const Candidate = require("../models/Candidate");

const { truncateToLastWord, formatState } = require("../utils/string");

// API
router.use("/api", require("./api/index.js"));

// PAGES

router.get("/", (req, res) => {
  res.render("index", {
    title: "Homepage - desempregados.com",
    styles: [
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
      "/css/index.css",
    ],
  });
});

router.get("/vagas", (req, res) => {
  res.render("vagas");
});

router.get("/empresas", async (req, res) => {
  const companies = await Company.find();
  res.render("companies", { companies, truncateToLastWord, formatState });
});

router.use("/carreiras", require("./careers"));

router.get("/candidatos", async (req, res) => {
  const candidates = await Candidate.find();
  const companies = await Company.find();
  const emails = await User.find({
    profile: { $in: candidates.map((c) => c._id) },
  }).select("email");

  res.render("candidates", {
    candidates,
    companies,
    emails,
    formatState,
    truncateToLastWord,
  });
});

router.get("/sobre", (req, res) => {
  res.render("sobre");
});

router.use("/", require("./auth"));

module.exports = router;
