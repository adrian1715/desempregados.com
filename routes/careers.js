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
  console.log(careers);
  res.render("careers/index", { careers });
});

// add new career page
router.get("/adicionar", (req, res) =>
  res.render("careers/new", {
    styles: ["/css/careers/new.css"],
    scripts: ["/js/careers/new.js"],
  })
);

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

    const careerPage = await CareerPage.findOne({
      career: careerObj._id,
    });

    if (!careerPage) throw Error("Could not find page!");

    res.render("careers/show", {
      careerPage,
      styles: ["/css/careers/show.css"],
    });
  })
);

module.exports = router;
