const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const CareerPage = require("../../models/CareerPage");
const Career = require("../../models/Career");

router.get("/", async (req, res) => {
  const pages = await CareerPage.find();

  if (!pages) return res.status(404).json({ message: "Could not find pages." });

  return res.status(200).json(pages);
});

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const page = await CareerPage.findById(id).catch((err) => null);

    if (!page)
      return res.status(400).json({ message: "Could not find page ID." });

    return res.status(200).json(page);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    if (!req.body)
      return res.status(400).json({ message: "Invalid page content." });

    const career = await Career.findOne({ name: req.body.career });

    if (!career) return res.status(400).json({ message: "Invalid career." });

    const newPage = new CareerPage({ ...req.body, career: career._id });
    await newPage.save();

    return res
      .status(200)
      .json({ message: "Career page succesfully created.", newPage });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const newContent = await CareerPage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!newContent)
      return res
        .status(500)
        .json({ message: "Could not update page content." });

    return res
      .status(200)
      .json({ message: "Page content successfully updated.", newContent });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedPage = await CareerPage.findByIdAndDelete(id);
    if (!deletedPage)
      return res.status(500).json({ message: "Could not delete page." });

    return res
      .status(200)
      .json({ message: "Career page successfully deleted", deletedPage });
  })
);

module.exports = router;
