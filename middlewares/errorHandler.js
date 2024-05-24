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
  console.log(err);
  console.error(err.stack);
  res.status(500).render("../error", { error: err });
};

module.exports = { notFound, errorHandler };
