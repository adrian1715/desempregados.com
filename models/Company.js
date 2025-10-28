const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Insira o nome da empresa."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Insira uma descrição para a empresa."],
      maxlength: [500, "A descrição não pode exceder 500 caracteres."],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Insira um número de telefone."],
      match: [
        /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
        "Número de telefone inválido. Use um formato brasileiro válido — Ex: (11) 91234-5678 ou 11 1234-5678.",
      ],
      trim: true,
    },
    // },
    location: {
      country: {
        type: String,
        required: [true, "Insira o país da empresa"],
        trim: true,
        // default: "Brasil",
      },
      city: {
        type: String,
        required: [true, "Insira a cidade da empresa."],
        trim: true,
      },
      state: {
        type: String,
        enum: {
          values: [
            "Acre|AC",
            "Alagoas|AL",
            "Amapá|AP",
            "Amazonas|AM",
            "Bahia|BA",
            "Ceará|CE",
            "Distrito Federal|DF",
            "Espírito Santo|ES",
            "Goiás|GO",
            "Maranhão|MA",
            "Mato Grosso|MT",
            "Mato Grosso do Sul|MS",
            "Minas Gerais|MG",
            "Pará|PA",
            "Paraíba|PB",
            "Paraná|PR",
            "Pernambuco|PE",
            "Piauí|PI",
            "Rio de Janeiro|RJ",
            "Rio Grande do Norte|RN",
            "Rio Grande do Sul|RS",
            "Rondônia|RO",
            "Roraima|RR",
            "Santa Catarina|SC",
            "São Paulo|SP",
            "Sergipe|SE",
            "Tocantins|TO",
          ],
          message: "Estado (UF) inválido. Informe um estado brasileiro válido.",
        },
        // required if country is Brazil
        required: [
          function () {
            return this.location && this.location.country === "Brasil";
          },
          "Insira o estado de sua empresa no Brasil.",
        ],
      },
    },
    postedJobs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
