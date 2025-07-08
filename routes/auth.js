const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/cadastro", (req, res) => res.render("auth/cadastro"));

module.exports = router;
