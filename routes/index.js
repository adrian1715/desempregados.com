const express = require("express");
const router = express.Router();

const path = require("path");

router.get("/", (req, res) => {
  res.render("index", { title: "Homepage - desempregados.com" });
});

// router.get("/desempregados", (req, res) => {
//   res.sendFile(path.join(__dirname, "../views/pages", "desempregados.html"));
// });

router.get("/vagas", (req, res) => {
  res.render("vagas");
});

router.get("/cadastrar-vaga", (req, res) => {
  res.render("cadastrar-vaga");
});

router.get("/sobre", (req, res) => {
  res.render("sobre");
});

router.get("/contato", (req, res) => {
  res.render("contato");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
