const express = require("express");
const router = express.Router();

const path = require("path");

router.get("/", (req, res) => {
  res.render("index", { title: "Homepage - desempregados.com" });
});

router.get("/desempregados", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/pages", "desempregados.html"));
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
