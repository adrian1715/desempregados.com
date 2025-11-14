const express = require("express");
const router = express.Router();
const catchAsync = require("express-async-handler");
const mongoose = require("mongoose");

const Job = require("../../models/Job");
const Company = require("../../models/Company");
const Career = require("../../models/Career");

const isObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

router.get(
  "/",
  catchAsync(async (req, res) => {
    const jobs = await Job.find()
      .populate("company", "name")
      .populate("position", "name");
    return res.status(200).json(jobs);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    if (!isObjectId(id)) return res.status(400).json({ error: "ID inválido." });

    const job = await Job.findById(id)
      .populate("company", "name")
      .populate("position", "name");
    if (!job) return res.status(404).json({ error: "Vaga não encontrada." });

    return res.status(200).json(job);
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { title, description, salary, type, location } = req.body;

    if (!req.user || !req.user.profile)
      return res.status(401).json({ error: "Usuário não autenticado." });
    if (req.user.role !== "company")
      return res
        .status(403)
        .json({ error: "Apenas empresas podem criar vagas." });

    // assing company and career to their respective objects
    const [company, position] = await Promise.all([
      Company.findById(req.user.profile),
      Career.findOne({ name: req.body.position }),
    ]);
    if (!company)
      return res.status(404).json({ error: "Empresa não encontrada." });
    if (!position)
      return res
        .status(404)
        .json({ error: "Carreira/posição não encontrada." });

    const isRemote = !req.body.isRemote ? false : true;

    // Basic validation
    const errors = [];
    if (!title) errors.push("O título é obrigatório.");
    if (!position) errors.push("A carreira/posição é obrigatória.");
    if (!description) errors.push("A descrição é obrigatória.");
    if (!type) errors.push("O tipo de vaga é obrigatório.");
    if (!company) errors.push("A empresa é obrigatória.");
    if (!isRemote && !location)
      errors.push("Local é obrigatório quando não for remoto.");

    if (errors.length) return res.status(400).json({ errors });

    const job = new Job({
      title,
      position: position._id,
      description,
      salary,
      type,
      isRemote,
      location: isRemote ? undefined : location,
      company: company._id,
    });

    await job.save();

    req.flash("success", "Vaga criada com sucesso.");
    return res.redirect("/vagas");
  })
);

router.put(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    if (!isObjectId(id)) return res.status(400).json({ error: "ID inválido." });

    const updates = req.body;

    // If updating refs, validate them
    if (updates.position && !isObjectId(updates.position))
      return res.status(400).json({ error: "ID de posição inválido." });
    if (updates.company && !isObjectId(updates.company))
      return res.status(400).json({ error: "ID de empresa inválido." });

    if (updates.position) {
      const career = await Career.findById(updates.position);
      if (!career)
        return res
          .status(404)
          .json({ error: "Carreira/posição não encontrada." });
    }
    if (updates.company) {
      const comp = await Company.findById(updates.company);
      if (!comp)
        return res.status(404).json({ error: "Empresa não encontrada." });
    }

    // If switching to non-remote, ensure location exists
    if (typeof updates.isRemote !== "undefined" && updates.isRemote === false) {
      if (!updates.location) {
        // try to fetch existing doc to see if it already has location
        const existing = await Job.findById(id);
        if (!existing || !existing.location) {
          return res.status(400).json({
            error: "Local é obrigatório quando a vaga não for remota.",
          });
        }
      }
    }

    const job = await Job.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!job) return res.status(404).json({ error: "Vaga não encontrada." });

    return res.status(200).json(job);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    if (!isObjectId(id)) return res.status(400).json({ error: "ID inválido." });

    const job = await Job.findByIdAndDelete(id);
    if (!job) return res.status(404).json({ error: "Vaga não encontrada." });

    return res.status(200).json({ message: "Vaga removida com sucesso." });
  })
);

module.exports = router;
