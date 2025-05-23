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

    // rendering the career main page when it's the only one that exists
    if (careerPages.length === 1) {
      res.render("careers/show", {
        currentUrl: req.originalUrl,
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
    const normalizedCareerParam = careerParam
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    // Find the matching career using normalized comparison
    const careerObj = careers.find(
      (career) =>
        career.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase() === normalizedCareerParam
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
    const careerPage = await CareerPage.findById(req.params.id);

    if (!careerPage) throw Error("Could not find page.");
    // return res.status(404).json({ message: "Could not find page." });

    res.render("careers/show", {
      currentUrl: req.originalUrl,
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
