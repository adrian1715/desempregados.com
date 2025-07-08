const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl; // Store the original URL to redirect after login
    req.flash(
      "error",
      "Você precisa estar logado para adicionar uma nova página."
    );
    return res.redirect("/login");
  }
  next();
};

const storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) res.locals.returnTo = req.session.returnTo;

  next();
};

module.exports = { isLoggedIn, storeReturnTo };
