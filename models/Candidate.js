const mongoose = require("mongoose");
const { Schema } = mongoose;

const candidateSchema = new Schema(
  {
    CPF: {
      type: String,
      required: true,
      match: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, // regex validation
      unique: true,
    },
    name: {
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
      match: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
    },
    // password: {
    //   type: String,
    //   required: true,
    // },
    // cv: { },
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
