const router = require("express").Router();

const Company = require("../../models/Company");

router.get("/", async (req, res) => {
  const companies = await Company.find();
  return res.status(200).json(companies);
});

router.post("/", (req, res) => {
  const newCompany = new Company(req.body);
  if (!req.body) return res.status(500).json({ message: "Invalid data!" });

  return res.status(200).json({
    message: "Successfully created",
    newCompany,
  });
});

module.exports = router;
