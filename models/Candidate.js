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
          message: "Estado (UF) inválido. Informe um estado brasileiro válido.",
        },
        required: [true, "Insira o estado (UF)."],
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
