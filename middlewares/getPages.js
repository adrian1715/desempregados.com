const fs = require("fs");
const path = require("path");

function getPages(req, res, next) {
  const pagesDirectory = path.join(__dirname, "../views/pages");
  try {
    const files = fs.readdirSync(pagesDirectory);
    const ejsFiles = files.filter((file) => file.endsWith(".ejs"));
    const links = ejsFiles.map((file) => path.parse(file).name);

    // Set links array in response locals
    res.locals.pages = links;
    next();
  } catch (err) {
    console.error("Error reading directory:", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = getPages;
