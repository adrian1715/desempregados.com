const router = require("express").Router();
const passport = require("passport");

const User = require("../../models/User");
const { storeReturnTo } = require("../../middlewares/auth");

const catchAsync = require("express-async-handler");

router.get("/", async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
});

// registering a new user
router.post(
  "/",
  catchAsync(async (req, res) => {
    // error handling (it only works through a try catch block)
    try {
      const { password, ...userData } = req.body;
      const user = new User(userData);
      const registeredUser = await User.register(user, password); // makes user registration
      // if user registration is successful, authenticate the user
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        console.log("User logged in", req.user);
        req.flash("success", "Bem-vindo ao desempregados.com!");
        return res.redirect("/");
      });
    } catch (err) {
      req.flash("error", "Erro ao cadastrar usuário!");
      return res.redirect("/cadastro");
    }
  })
);

// login
router.post(
  "/login",
  storeReturnTo, // to save the returnTo value from session to res.locals
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  async (req, res) => {
    req.flash("success", "Bem-vindo de volta!");
    const redirectUrl = res.locals.returnTo || "/"; // to return to the previous route before login
    return res.redirect(redirectUrl);
  }
);

// logout
router.post("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Até logo!");
    return res.redirect("/");
  });
});

router.delete(
  "/",
  catchAsync(async (req, res) => {
    const deletedData = await User.deleteMany();
    return res.status(200).json(deletedData);
  })
);

module.exports = router;
