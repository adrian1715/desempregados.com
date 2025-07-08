const express = require("express");
const app = express();
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const PORT = process.env.PORT || 3001;
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");

const getPages = require("./middlewares/getPages");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const { logger } = require("./middlewares/logEvents");

require("./config/db.js"); // connecting to database

// setting up views pages
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", "views/pages");
app.use(express.static("public"));

// setting up sessions and flash
const sessionConfig = {
  secret: process.env.SESSION_SECRET || "defaultsecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week (in ms)
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week (in ms)
  },
};
app.use(session(sessionConfig));
app.use(flash()); // flash messages

// setting up passport for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // used passport strategy
// serialize and deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middlewares
app.use(getPages); // getting pages
app.use(logger); // log generator

// global variables
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.pages = res.locals.pages || [];
  next();
});
// setting up routes
app.use("/", require("./routes/index"));
// app.use("/api"); // restful api

// error middlewares
app.use(notFound); // 404 Not Found
app.use(errorHandler); // General Error Handling

app.listen(PORT, () => console.log("running on port", PORT));
