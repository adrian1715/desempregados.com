const express = require("express");
const router = express.Router();

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

router.get("/empresas", (req, res) => {
  res.render("empresas");
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
