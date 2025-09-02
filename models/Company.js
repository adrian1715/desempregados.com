const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: {
      type: String,
      required: true,
      maxlength: 500,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
    },
    // email: {
    //   type: String,
    //   required: true,
    //   match: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i, // regex validation
    // },
    location: {
      country: {
        type: String,
        required: true,
        trim: true,
        // default: "Brasil",
      },
      city: { type: String, required: true, trim: true },
      state: {
        type: String,
        enum: [
          "Acre",
          "Alagoas",
          "Amapá",
          "Amazonas",
          "Bahia",
          "Ceará",
          "Distrito Federal",
          "Espírito Santo",
          "Goiás",
          "Maranhão",
          "Mato Grosso",
          "Mato Grosso do Sul",
          "Minas Gerais",
          "Pará",
          "Paraíba",
          "Paraná",
          "Pernambuco",
          "Piauí",
          "Rio de Janeiro",
          "Rio Grande do Norte",
          "Rio Grande do Sul",
          "Rondônia",
          "Roraima",
          "Santa Catarina",
          "São Paulo",
          "Sergipe",
          "Tocantins",
        ],
        // required if country is Brazil
        required: function () {
          return this.location.country === "Brasil";
        },
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
