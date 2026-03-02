const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User");
const Company = require("../models/Company");
const Candidate = require("../models/Candidate");
const Job = require("../models/Job");

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

router.use("/vagas", require("./jobs"));

router.get("/empresas", async (req, res) => {
  const companies = await Company.find();
  res.render("empresas", { companies, truncateToLastWord, formatState });
});

router.get("/empresas/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Empresa não encontrada.");
    return res.redirect("/empresas");
  }
  const company = await Company.findById(id);
  if (!company) {
    req.flash("error", "Empresa não encontrada.");
    return res.redirect("/empresas");
  }
  const jobs = await Job.find({ company: company._id }).populate("position");
  res.render("empresas/show", { company, jobs, truncateToLastWord, formatState });
});

router.use("/carreiras", require("./careers"));

router.get("/candidatos", async (req, res) => {
  const candidates = await Candidate.find();
  const emails = await User.find({
    profile: { $in: candidates.map((c) => c._id) },
  }).select("email");

  res.render("candidatos", {
    candidates,
    emails,
    formatState,
    truncateToLastWord,
  });
});

router.get("/candidatos/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Candidato não encontrado.");
    return res.redirect("/candidatos");
  }
  const candidate = await Candidate.findById(id).populate({
    path: "appliedJobs",
    populate: { path: "company", select: "name" },
  });
  if (!candidate) {
    req.flash("error", "Candidato não encontrado.");
    return res.redirect("/candidatos");
  }
  const userRecord = await User.findOne({ profile: candidate._id }).select("email");
  res.render("candidatos/show", {
    candidate,
    email: userRecord ? userRecord.email : null,
    formatState,
    truncateToLastWord,
  });
});

router.get("/sobre", (req, res) => {
  res.render("sobre");
});

router.use("/", require("./auth"));

module.exports = router;
