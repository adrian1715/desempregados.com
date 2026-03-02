const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Career = require("../models/Career");
const Candidate = require("../models/Candidate");

const { truncateToLastWord, formatState } = require("../utils/string");
const { isLoggedIn } = require("../middlewares/auth");
const Job = require("../models/Job");

// list page
router.get("/", async (req, res) => {
  const jobs = await Job.find().populate("company").populate("position");
  const careers = await Career.find();
  const q = req.query.q || "";
  res.render("vagas/index", {
    jobs,
    careers,
    truncateToLastWord,
    formatState,
    q,
    scripts: ["/js/jobs/index.js"],
  });
});

// render "add job" page with companies and careers
router.get("/adicionar", isLoggedIn, async (req, res) => {
  if (req.user.role !== "company") {
    req.flash("error", "Apenas empresas podem publicar vagas.");
    return res.redirect("/vagas");
  }
  const careers = await Career.find();
  res.render("vagas/new", { careers, scripts: ["/js/jobs/new.js"] });
});

// job detail page
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Vaga não encontrada.");
    return res.redirect("/vagas");
  }

  const job = await Job.findById(id)
    .populate("company")
    .populate("position")
    .populate("appliedCandidates");
  if (!job) {
    req.flash("error", "Vaga não encontrada.");
    return res.redirect("/vagas");
  }

  // Check if current user (candidate) already applied
  let hasApplied = false;
  if (req.user && req.user.role === "candidate") {
    const candidate = await Candidate.findById(req.user.profile);
    if (candidate) {
      hasApplied = job.appliedCandidates.some(
        (c) => c._id.toString() === candidate._id.toString()
      );
    }
  }

  res.render("vagas/show", {
    job,
    hasApplied,
    formatState,
    truncateToLastWord,
  });
});

module.exports = router;
