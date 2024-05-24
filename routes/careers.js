const express = require("express");
const router = express.Router();

// Middleware to add styles variable to response locals
router.use((req, res, next) => {
  res.locals.styles = ["/css/career.css"];
  next();
});

router.get("/", (req, res) => res.render("careers/index"));

router.get("/medicos", (req, res) => res.render("careers/medicos"));

router.get("/engenheiros", (req, res) => res.render("careers/engenheiros"));

router.get("/cozinheiros", (req, res) => res.render("careers/cozinheiros"));

router.get("/jogadores", (req, res) => res.render("careers/jogadores"));

router.get("/advogados", (req, res) => res.render("careers/advogados"));

router.get("/programadores", (req, res) => res.render("careers/programadores"));

router.get("/professores", (req, res) => res.render("careers/professores"));

module.exports = router;
