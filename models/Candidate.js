const mongoose = require("mongoose");
const { Schema } = mongoose;

const candidateSchema = new Schema(
  {
    name: {
      first: { type: String, required: true, trim: true },
      last: { type: String, required: true, trim: true },
    },
    phone: {
      type: String,
      required: true,
      match: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, // BR format
    },
    // email: {
    //   type: String,
    //   required: true,
    //   match: /^([A-Z0-9._%+-]+)@[A-Z0-9.-]+\.([A-Z]{2,})$/i, // regex validation
    // },
    location: {
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
        required: true,
      },
    },
    cv: {
      filename: String,
      originalName: String,
      mimetype: {
        type: String,
        validate: {
          validator: function (v) {
            if (!v) return true; // Allow empty values
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
            "CV must be a PDF, DOCX, or image file (JPEG, PNG, GIF, WebP)",
        },
      },
      size: {
        type: Number,
        required: false,
        max: [5 * 1024 * 1024, "CV file size cannot exceed 5MB"], // 5MB limit
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
