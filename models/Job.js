const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    position: {
      type: Schema.Types.ObjectId,
      ref: "Career",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: Number,
    isRemote: {
      type: Boolean,
      required: true,
    },
    location: {
      type: String,
      required: function () {
        return !this.isRemote;
      }, // required only if job is not remote
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    candidates: [{ type: Schema.Types.ObjectId, ref: "Candidate" }],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
