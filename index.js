const express = require("express");
const app = express();
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const PORT = process.env.PORT || 3001;
const ejsMate = require("ejs-mate");

const getPages = require("./middlewares/getPages");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

require("./config/db.js"); // connecting to database

// setting up views pages
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", "views/pages");
app.use(express.static("public"));

// middlewares
app.use(getPages); // getting pages

// setting up routes
app.use("/", require("./routes/index"));
// app.use("/api"); // restful api

// error middlewares
app.use(notFound); // 404 Not Found
app.use(errorHandler); // General Error Handling

app.listen(PORT, () => console.log("running on port", PORT));
