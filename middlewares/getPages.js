const fs = require("fs");
const path = require("path");

function getPages(req, res, next) {
  try {
    const pagesDirectory = path.join(__dirname, "../views/pages");
    const items = fs.readdirSync(pagesDirectory, { withFileTypes: true });

    const pageLinks = [];

    for (let item of items) {
      if (item.isFile() && item.name.endsWith(".ejs")) {
        // It's a file directly in pages directory
        pageLinks.push(path.parse(item.name).name);
      } else if (item.isDirectory()) {
        // It's a folder, check if it has index.ejs
        const folderPath = path.join(pagesDirectory, item.name);
        const folderFiles = fs.readdirSync(folderPath);

        if (folderFiles.includes("index.ejs")) {
          // Add folder name to pages if it has an index.ejs
          pageLinks.push(item.name);
        }

        // Also get all ejs files in this folder for res.locals[foldername]
        const ejsFiles = folderFiles.filter(file => file.endsWith(".ejs"));
        const links = ejsFiles.map(file => path.parse(file).name);
        res.locals[item.name] = links;
      }
    }

    res.locals.pages = pageLinks;

    next();
  } catch (err) {
    console.error("Error reading directory:", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = getPages;
