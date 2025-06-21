const notFound = (req, res, next) => {
  res.status(404).render("../error", {
    error: {
      status: 404,
      message: "Página não encontrada!",
      info: `Não encontramos nenhuma página com o endereço <b>${req.originalUrl}</b>`,
    },
  });
};

const errorHandler = (err, req, res, next) => {
  console.log(`${err.name}: ${err.message}`);
  console.error(err.stack);
  res.status(err.status || 500).render("../error", { error: err });
};

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer Error:", err.message);
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

module.exports = { notFound, errorHandler, multerErrorHandler };
