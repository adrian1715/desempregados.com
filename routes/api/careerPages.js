const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const CareerPage = require("../../models/CareerPage");
const Career = require("../../models/Career");

const multer = require("multer");
const { storage } = require("../../config/cloudinary");
const upload = multer({ storage }); // multer upload middleware (to handle multipart/form-data forms)
// const upload = multer({ dest: "uploads/" }); // to temporarily store files on the "uploads" folder

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
  upload.fields([
    { name: "header-image", maxCount: 1 },
    { name: "education-and-skills-image", maxCount: 1 },
    { name: "challenges-and-rewards-image", maxCount: 1 },
  ]),
  asyncHandler(async (req, res) => {
    if (!req.body)
      return res.status(400).json({ message: "Invalid page content." });

    // console.log({ files: req.files, body: req.body });
    // return res.send({ files: req.files, body: req.body });

    const career = await Career.findOne({ name: req.body.career });

    if (!career) return res.status(400).json({ message: "Invalid career." }); // error needs to be properly handled here!

    const newPage = new CareerPage({ ...req.body, career: career._id });

    // validating if all three images are present
    if (
      !req.files["header-image"] ||
      !req.files["education-and-skills-image"] ||
      !req.files["challenges-and-rewards-image"]
    ) {
      return res
        .status(400)
        .json({ message: "All three images are required." });
    }

    // assigning images to CareerPage object
    newPage.header.image = {
      ...newPage.header,
      url: req.files["header-image"][0].path,
      filename: req.files["header-image"][0].filename,
      subtitle: req.body["header"]["image"]["subtitle"],
    };
    newPage.educationAndSkills.image = {
      ...newPage.educationAndSkills,
      url: req.files["education-and-skills-image"][0].path,
      filename: req.files["education-and-skills-image"][0].filename,
      subtitle: req.body["educationAndSkills"]["image"]["subtitle"],
    };
    newPage.challengesAndRewards.image = {
      ...newPage.challengesAndRewards,
      url: req.files["challenges-and-rewards-image"][0].path,
      filename: req.files["challenges-and-rewards-image"][0].filename,
      subtitle: req.body["challengesAndRewards"]["image"]["subtitle"],
    };

    await newPage.save();

    const careerPages = await CareerPage.find();
    console.log(newPage);
    // req.flash("success", "Página de carreira criada com sucesso!"); // add flash messages
    return res.redirect("/carreiras");
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
