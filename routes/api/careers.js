const router = require("express").Router();
const Career = require("../../models/Career");

router.get("/", async (req, res) => {
  const careers = await Career.find();
  return res.status(200).json(careers);
});

router.post("/", async (req, res) => {
  if (!req.body)
    return res.status(500).json({ message: "Insert a career name!" });

  const career = new Career(req.body);
  await career.save();

  return res
    .status(200)
    .json({ message: "Career successfully registered!", career });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  //   if (!req.body.id) return res.status(500).json("Insert an ID!");

  console.log(id);
  const career = await Career.findByIdAndDelete(id);

  if (!career) return res.status(500).json({ message: "Career not found!" });

  return res.status(200).json({
    message: "Career successfully deleted!",
    deletedCareer: career,
  });
});

module.exports = router;
