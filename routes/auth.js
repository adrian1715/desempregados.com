const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/cadastro", async (req, res) => {
  const { user } = req.query;

  try {
    const statesResponse = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    const statesData = await statesResponse.json();
    const states = statesData
      .map((state) => ({
        nome: state.nome,
        sigla: state.sigla,
      }))
      .sort((a, b) => a.nome.localeCompare(b.nome));

    let countries = [];

    if (user === "company") {
      const countriesResponse = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/paises"
      );
      const countriesData = await countriesResponse.json();
      countries = countriesData
        .map((country) => country.nome)
        .sort((a, b) => a.localeCompare(b));
    }

    // 3. Renderizar template com os dados
    res.render("auth/cadastro", {
      user: user || null,
      states,
      countries,
    });
  } catch (error) {
    console.error("Error fetching IBGE data:", error);
    res.render("auth/cadastro", {
      user: user || null,
      states: [],
      countries: [],
    });
  }
});

module.exports = router;
