const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/cadastro", (req, res) => {
  const { user } = req.query; // gets user form the url params

  res.render("auth/cadastro", {
    user: user || null,
  });
});

module.exports = router;
