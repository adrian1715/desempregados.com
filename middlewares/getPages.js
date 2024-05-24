const fs = require("fs");
const path = require("path");

function getPages(req, res, next) {
  const items = ["pages", "careers"];

  try {
    for (let item of items) {
      const pagesDirectory = path.join(
        __dirname,
        `${item === "pages" ? "../views/pages" : `../views/pages/${item}`}`
      );
      const files = fs.readdirSync(pagesDirectory);
      const ejsFiles = files.filter((file) => file.endsWith(".ejs"));
      const links = ejsFiles.map((file) => path.parse(file).name);
      // Set links array in response locals
      res.locals[item] = links;
    }

    next();
  } catch (err) {
    console.error("Error reading directory:", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = getPages;
