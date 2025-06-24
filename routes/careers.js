const express = require("express");
const router = express.Router();
const catchAsync = require("express-async-handler");

const { toUpperCaseInitial, formatCareerName } = require("../utils/string");

const Career = require("../models/Career");
const CareerPage = require("../models/CareerPage");

// // Middleware to add styles variable to response locals
// router.use((req, res, next) => {
//   res.locals.styles = ["/css/careers/show.css"];
//   next();
// });

// CAREERS HOMEPAGE
router.get("/", async (req, res) => {
  const careers = await Career.find().populate("pages");
  res.render("careers/index", {
    showModal: false,
    careers,
    formatCareerName,
    styles: ["/css/careers/index.css"],
    scripts: ["/js/careers/index.js"],
  });
});

// ADD NEW CAREER
router.get("/adicionar", async (req, res) => {
  const careers = await Career.find().populate("pages");
  console.log(careers);

  res.render("careers/index", {
    showModal: true,
    careers,
    formatCareerName,
    styles: ["/css/careers/index.css"],
    scripts: ["/js/careers/index.js"],
  });
});

// ADD NEW CAREER PAGE
router.get(
  "/:career/nova-pagina",
  catchAsync(async (req, res) => {
    const careers = await Career.find();
    const { career } = req.params;

    res.render("careers/new", { careers, career, formatCareerName });
  })
);

// SHOW CAREER PAGE
router.get(
  "/:career",
  catchAsync(async (req, res) => {
    // Fetch all careers from the database
    const careers = await Career.find();

    // Find the matching career using normalized comparison
    const careerObj = careers.find(
      (career) =>
        formatCareerName(career.name) === formatCareerName(req.params.career)
    );

    if (!careerObj) throw Error("Could not find page!");

    const careerPages = await CareerPage.find({
      career: careerObj._id,
    });

    // rendering the career main page when it's the only one that exists
    if (careerPages.length === 1) {
      res.render("careers/show", {
        currentUrl: req.originalUrl,
        careerName: careerObj.name.toLowerCase(),
        careerPages,
        careerPage: careerPages[0],
        styles: ["/css/careers/show.css"],
      });
    }

    if (!careerPages) throw Error("Could not find page!");

    return res.render("careers/pages", {
      currentPath: req.path,
      career: careerObj,
      careerPages,
    });
  })
);

// EDIT CAREER PAGE - when there's just one careerer page for that career
router.get(
  "/:career/editar",
  catchAsync(async (req, res) => {
    const careers = await Career.find();

    const careerParam = req.params.career;
    const normalizedCareerParam = formatCareerName(careerParam);

    // Find the matching career using normalized comparison
    const careerObj = careers.find(
      (career) => formatCareerName(career.name) === normalizedCareerParam
    );

    const careerPage = await CareerPage.findOne({
      career: careerObj._id,
    }).populate("career");

    console.log(careerPage);

    if (!careerPage) throw Error("Could not find page.");

    res.render("careers/edit", {
      careers,
      careerPage,
      styles: ["/css/careers/new.css"],
      scripts: ["/js/careers/new.js"],
    });
  })
);

// SHOW SPECIFIC CAREER PAGE (when there's more than one page for that career)
router.get(
  "/:career/:id",
  catchAsync(async (req, res) => {
    const careers = await Career.find();
    const careerObj = careers.find(
      (career) =>
        formatCareerName(career.name) === formatCareerName(req.params.career)
    );
    const careerPage = await CareerPage.findById(req.params.id);

    if (!careerPage) throw Error("Could not find page.");
    // return res.status(404).json({ message: "Could not find page." });

    res.render("careers/show", {
      currentUrl: req.originalUrl,
      careerName: careerObj.name.toLowerCase(),
      careerPages: careerObj.pages,
      careerPage,
      styles: ["/css/careers/show.css"],
    });
  })
);

// EDIT SPECIFIC CAREER PAGE
router.get(
  "/:career/:id/editar",
  catchAsync(async (req, res) => {
    const careers = await Career.find();
    const careerPage = await CareerPage.findById(req.params.id).populate(
      "career"
    );

    if (!careerPage) throw Error("Could not find page.");

    console.log(careerPage);

    res.render("careers/edit", {
      careers,
      careerPage,
      styles: ["/css/careers/new.css"],
      scripts: ["/js/careers/new.js"],
    });
  })
);

module.exports = router;
