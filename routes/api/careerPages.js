const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const CareerPage = require("../../models/CareerPage");
const Career = require("../../models/Career");

const multer = require("multer");
const { storage } = require("../../config/cloudinary");
const { formatCareerName } = require("../../utils/string");

const upload = multer({ storage }); // multer upload middleware (to handle multipart/form-data forms)
const upload2 = multer({ dest: "uploads/" }); // to temporarily store files on the "uploads" folder (for testing purposes)

// api only
router.get("/", async (req, res) => {
  const pages = await CareerPage.find();

  if (!pages) return res.status(404).json({ message: "Could not find pages." });

  return res.status(200).json(pages);
});

// api only
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const page = await CareerPage.findById(id);

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
    if (!req.body) {
      // return res.status(400).json({ message: "Invalid page content." });
      req.flash("error", "Conteúdo da página inválido.");
      return res.redirect(
        `/carreiras/${formatCareerName(career.name)}/nova-pagina`
      );
    }

    const career = await Career.findOne({ name: req.body.career });

    if (!career) {
      // return res.status(400).json({ message: "Invalid career." });
      req.flash("error", "Carreira inválida.");
      return res.redirect(
        `/carreiras/${formatCareerName(career.name)}/nova-pagina`
      );
    }

    const newPage = new CareerPage({ ...req.body, career: career._id });

    // validating if all three images are present
    if (
      !req.files["header-image"] ||
      !req.files["education-and-skills-image"] ||
      !req.files["challenges-and-rewards-image"]
    ) {
      // return res
      //   .status(400)
      //   .json({ message: "All three images are required." });
      req.flash("error", "Todos as imagens são obrigatórias.");
      return res.redirect(
        `/carreiras/${formatCareerName(career.name)}/nova-pagina`
      );
    }

    // assigning images to CareerPage object
    newPage.header.image = {
      url: req.files["header-image"][0].path,
      filename: req.files["header-image"][0].filename,
      subtitle: req.body.header.image.subtitle,
    };
    newPage.educationAndSkills.image = {
      url: req.files["education-and-skills-image"][0].path,
      filename: req.files["education-and-skills-image"][0].filename,
      subtitle: req.body.educationAndSkills.image.subtitle,
    };
    newPage.challengesAndRewards.image = {
      url: req.files["challenges-and-rewards-image"][0].path,
      filename: req.files["challenges-and-rewards-image"][0].filename,
      subtitle: req.body.challengesAndRewards.image.subtitle,
    };

    await newPage.save();

    console.log(newPage);

    req.flash("success", "Página de carreira criada com sucesso!");
    return res.redirect(
      `/carreiras/${formatCareerName(career.name)}/${newPage._id}`
    );
  })
);

router.put(
  "/:id",
  upload.fields([
    { name: "header-image", maxCount: 1 },
    { name: "education-and-skills-image", maxCount: 1 },
    { name: "challenges-and-rewards-image", maxCount: 1 },
  ]),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const originalPage = await CareerPage.findById(id);

    const { career } = req.body;
    const careerObj = await Career.findOne({ name: career });

    const updatedPage = {
      ...req.body,
      career: careerObj._id,
      header: {
        ...req.body.header,
        image: {
          ...originalPage.header.image.toObject(), // convert to plain object
          subtitle: req.body.header.image.subtitle, // in case subtitle is updated
        },
      },
      educationAndSkills: {
        ...req.body.educationAndSkills,
        image: {
          ...originalPage.educationAndSkills.image.toObject(),
          subtitle: req.body.educationAndSkills.image.subtitle,
        },
      },
      challengesAndRewards: {
        ...req.body.challengesAndRewards,
        image: {
          ...originalPage.challengesAndRewards.image.toObject(),
          subtitle: req.body.challengesAndRewards.image.subtitle,
        },
      },
    };

    // if there are files, assign them to the updatedPage object
    if (Object.keys(req.files).length > 0) {
      // assigning images to CareerPage object
      if (req.files["header-image"])
        updatedPage.header.image = {
          url: req.files["header-image"][0].path,
          filename: req.files["header-image"][0].filename,
          subtitle: req.body.header.image.subtitle,
        };
      if (req.files["education-and-skills-image"])
        updatedPage.educationAndSkills.image = {
          url: req.files["education-and-skills-image"][0].path,
          filename: req.files["education-and-skills-image"][0].filename,
          subtitle: req.body.educationAndSkills.image.subtitle,
        };
      if (req.files["challenges-and-rewards-image"])
        updatedPage.challengesAndRewards.image = {
          url: req.files["challenges-and-rewards-image"][0].path,
          filename: req.files["challenges-and-rewards-image"][0].filename,
          subtitle: req.body.challengesAndRewards.image.subtitle,
        };
    }

    const newContent = await CareerPage.findByIdAndUpdate(
      req.params.id,
      updatedPage,
      { new: true }
    );

    if (!newContent) {
      // return res
      //   .status(500)
      //   .json({ message: "Could not update page content." });
      req.flash("error", "Não foi possível atualizar a página.");
      return res.redirect(`/carreiras/${formatCareerName(career)}/${id}`);
    }

    req.flash("success", "Página de carreira atualizada com sucesso!");
    return res.redirect(`/carreiras/${career.toLowerCase()}/${id}`); // redirect to the updated page
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedPage = await CareerPage.findByIdAndDelete(id);

    if (!deletedPage) {
      // return res.status(500).json({ message: "Could not delete page." });

      // flash message for error handling
      req.flash("error", "Não foi possível excluir a página.");
      return res.redirect(`/carreiras/${formatCareerName(career.name)}/${id}`);
    }

    const career = await Career.findById(deletedPage.career);

    req.flash("success", "Página de carreira excluída com sucesso!");
    return res.redirect(`/carreiras/${formatCareerName(career.name)}/${id}`);
  })
);

module.exports = router;
