const router = require("express").Router();
const passport = require("passport");

const User = require("../../models/User");
const Candidate = require("../../models/Candidate");
const Company = require("../../models/Company");

const { storeReturnTo } = require("../../middlewares/auth");
const catchAsync = require("express-async-handler");

router.get("/", async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
});

// registering a new user
router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const { password, confirmEmail, role, ...userData } = req.body;

    try {
      // 1. Validate email
      if (userData.email !== confirmEmail) {
        req.flash("error", "Os e-mails não coincidem. Tente novamente.");
        return res.redirect(`/cadastro?user=${role}`);
      }

      // 2. Create role-specific profile
      let profile;
      if (role === "candidate") {
        profile = await new Candidate(userData).save();
        // const { body } = req;
        // return res.status(201).json({ profile, body });
      } else if (role === "company") {
        profile = await new Company(userData).save();
        // return res.status(201).json(profile);
      } else {
        req.flash("error", "Tipo de usuário inválido.");
        return res.redirect(`/cadastro?user=${role}`);
      }

      // 3. Create user with reference to the profile
      const user = new User({
        email: userData.email,
        role,
        profile: profile._id,
      });

      const registeredUser = await User.register(user, password); // passport-local-mongoose handles hashing

      // 4. Authenticate and login
      req.login(registeredUser, (err) => {
        if (err) return next(err);

        console.log("User logged in", req.user);
        req.flash("success", "Bem-vindo ao desempregados.com!");
        return res.redirect("/");
      });
    } catch (err) {
      console.error(err);
      req.flash("error", "Erro ao cadastrar usuário!");
      return res.redirect(`/cadastro?user=${role}`);
    }
  })
);

// login
router.post(
  "/login",
  storeReturnTo, // to save the returnTo value from session to res.locals
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        req.flash("error", "Erro ao autenticar usuário.");
        return next(err);
      }
      if (!user) {
        // Check if the error message is related to username or password
        const errorMessage =
          info.message === "Password or username is incorrect"
            ? "Senha ou nome de usuário incorreto!"
            : "Erro ao fazer login, tente novamente";
        req.flash("error", errorMessage);
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          req.flash("error", "Error ao fazer login.");
          return next(err);
        }
        req.flash("success", "Bem-vindo de volta!");
        const redirectUrl = res.locals.returnTo || "/";
        return res.redirect(redirectUrl);
      });
    })(req, res, next);
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
