const router = require("express").Router();
const Career = require("../../models/Career");
const asyncHandler = require("express-async-handler");

router.get("/", async (req, res) => {
  const careers = await Career.find();
  return res.status(200).json(careers);
});

router.post(
  "/",
  asyncHandler(async (req, res) => {
    if (!req.body.name)
      return res.status(500).json({ message: "Insert a career name!" });

    const careers = await Career.find();
    const careerExists = careers.find(
      (career) => career.name === req.body.name
    );
    if (careerExists)
      return res.status(500).json({ message: "Career already exists!" });

    const career = new Career(req.body);
    await career.save();

    // return res
    //   .status(200)
    //   .json({ message: "Career successfully registered!", career });
    return res.redirect("/carreiras");
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    //   if (!req.body.id) return res.status(500).json("Insert an ID!");

    console.log(id);
    const career = await Career.findByIdAndDelete(id);

    if (!career) return res.status(500).json({ message: "Career not found!" });

    return res.status(200).json({
      message: "Career successfully deleted!",
      deletedCareer: career,
    });
  })
);

module.exports = router;
