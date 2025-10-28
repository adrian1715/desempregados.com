const mongoose = require("mongoose");
const { Schema } = mongoose;

const candidateSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        required: [true, "Insira o primeiro nome."],
        trim: true,
      },
      last: {
        type: String,
        required: [true, "Insira o sobrenome."],
        trim: true,
      },
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
    location: {
      city: {
        type: String,
        required: [true, "Insira a cidade."],
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
    cv: {
      filename: String,
      originalName: String,
      mimetype: {
        type: String,
        validate: {
          validator: function (v) {
            if (!v) return true; // Allows empty values
            const allowedTypes = [
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
              "application/msword", // .doc
              "image/jpeg",
              "image/jpg",
              "image/png",
              "image/gif",
              "image/webp",
            ];
            return allowedTypes.includes(v);
          },
          message:
            "Currículo deve ser um arquivo PDF, DOC, DOCX ou imagens (JPEG, PNG, GIF, WebP).",
        },
      },
      size: {
        type: Number,
        required: false,
        max: [5 * 1024 * 1024, "O currículo não pode exceder 5MB."],
      },
      uploadDate: { type: Date, default: Date.now },
    },
    appliedJobs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
