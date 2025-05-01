const express = require("express");
const router = express.Router();
const catchAsync = require("express-async-handler");

const Career = require("../models/Career");
const CareerPage = require("../models/CareerPage");

// // Middleware to add styles variable to response locals
// router.use((req, res, next) => {
//   res.locals.styles = ["/css/careers/show.css"];
//   next();
// });

// careers homepage
router.get("/", async (req, res) => {
  const careers = await Career.find();
  res.render("careers/index", { careers });
});

// add new career page
router.get("/adicionar", async (req, res) => {
  const careers = await Career.find();
  res.render("careers/new", {
    careers,
    styles: ["/css/careers/new.css"],
    scripts: ["/js/careers/new.js"],
  });
});

// show career page
router.get(
  "/:career",
  catchAsync(async (req, res) => {
    const careerParam = req.params.career;
    const normalizedCareerParam = careerParam
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    // Fetch all careers from the database
    const careers = await Career.find();

    // Find the matching career using normalized comparison
    const careerObj = careers.find(
      (career) =>
        career.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase() === normalizedCareerParam
    );

    if (!careerObj) throw Error("Could not find page!");
    const careerPages = await CareerPage.find({
      career: careerObj._id,
    });

    // to show the career pages menu where there's more than one page
    if (careerPages.length > 1) {
      console.log(careerObj, careerPages);
      return res.render("careers/pages", {
        currentPath: req.path,
        career: careerObj,
        careerPages,
      });
    }

    if (!careerPages) throw Error("Could not find page!");

    console.log({ careerPage: careerPages[0], length: careerPages.length });

    // rendering the career main page when it's the only one that exists
    res.render("careers/show", {
      careerPage: careerPages[0],
      styles: ["/css/careers/show.css"],
    });
  })
);

// show specific career page (when there's more than one page for that career)
router.get(
  "/:career/:id",
  catchAsync(async (req, res) => {
    const careerPage = await CareerPage.findById(req.params.id);

    // not being triggered
    if (!careerPage)
      // throw Error("Could not find page.");
      return res.status(404).json({ message: "Could not find page." });

    res.render("careers/show", {
      careerPage,
      styles: ["/css/careers/show.css"],
    });
  })
);

module.exports = router;
