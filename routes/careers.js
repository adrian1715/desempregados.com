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

// CAREERS HOMEPAGE
router.get("/", async (req, res) => {
  const careers = await Career.find();
  res.render("careers/index", { careers });
});

// ADD NEW CAREER PAGE
router.get(
  "/adicionar",
  catchAsync(async (req, res) => {
    const careers = await Career.find();
    const previousPage = req.headers.referer; // get the previous page URL
    let formattedCareer = null;

    if (previousPage) {
      const urlParts = previousPage.split("/");
      const lastPart = urlParts.slice(-1)[0];
      const penultimatePart = urlParts.slice(-2)[0];
      const lastPartIsId = /^[0-9a-fA-F]{24}$/.test(lastPart);

      const career = lastPartIsId ? penultimatePart : lastPart;
      const careerObj = careers.find(
        (c) =>
          c.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase() ===
          career
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
      );
      formattedCareer = careerObj ? careerObj.name : career;
    }

    console.log(formattedCareer);

    res.render("careers/new", {
      careers,
      formattedCareer,
      styles: ["/css/careers/new.css"],
      scripts: ["/js/careers/new.js"],
    });
  })
);

// SHOW CAREER PAGE
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
      return res.render("careers/pages", {
        currentPath: req.path,
        career: careerObj,
        careerPages,
      });
    }

    if (!careerPages) throw Error("Could not find page!");

    // rendering the career main page when it's the only one that exists
    res.render("careers/show", {
      careerPage: careerPages[0],
      styles: ["/css/careers/show.css"],
    });
  })
);

// SHOW SPECIFIC CAREER PAGE (when there's more than one page for that career)
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
