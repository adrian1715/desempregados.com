const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema({
  name: {
    type: String,
    required: [true, "Company must have a name."],
  },
  email: {
    type: String,
    required: [true, "Company must have an email address"],
    match: [
      /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
      "Invalidate email address.",
    ],
  },
  password: {
    type: String,
    required: [true, "Company must have a password."],
  },
  jobsOffers: Array,
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
