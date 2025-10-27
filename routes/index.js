const express = require("express");
const router = express.Router();

const Company = require("../models/Company");
const Candidate = require("../models/Candidate");

const { truncateToLastWord } = require("../utils/string");

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
  res.render("companies", { companies, truncateToLastWord });
});

router.use("/carreiras", require("./careers"));

router.get("/candidatos", (req, res) => {
  res.render("candidatos");
});

router.get("/sobre", (req, res) => {
  res.render("sobre");
});

router.use("/", require("./auth"));

module.exports = router;
