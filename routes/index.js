const express = require("express");
const router = express.Router();

const path = require("path");

router.get("/", (req, res) => {
  res.render("index", {
    title: "Homepage - desempregados.com",
    styles: [
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
      "/css/desempregados.css",
    ],
  });
});

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
  res.render("auth/login");
});

router.get("/register", (req, res) => res.render("auth/register"));

module.exports = router;
