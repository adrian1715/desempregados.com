const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    CNPJ: {
      type: String,
      required: true,
      match: /^\d{2}\.?\d{3}\.?\d{3}\/?0001-?\d{2}$/,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
    },
    email: {
      type: String,
      required: true,
      match: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i, // regex validation
    },
    registeredJobs: [
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
