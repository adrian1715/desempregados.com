const express = require("express");
const router = express.Router();

const path = require("path");
const CustomError = require("../utils/CustomError");

router.get("/", (req, res) => {
  res.render("index", {
    title: "Homepage - desempregados.com",
    styles: [
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
      "/css/home.css",
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

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/register", (req, res) => res.render("auth/register"));

module.exports = router;
