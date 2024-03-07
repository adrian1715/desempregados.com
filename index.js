const express = require("express");
const app = express();
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const PORT = process.env.PORT || 3001;

const getPages = require("./middlewares/getPages");
const routes = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", "views/pages");
app.use(express.static("public"));

// getting pages middleware
app.use(getPages);

// app.use("/api"); // restful api

app.use("/", routes);

app.listen(PORT, () => console.log("running on port", PORT));
