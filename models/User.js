const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // regex validation
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["candidate", "company"],
      required: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "role", // dyamically references a Candidate or Company
    },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" }); // tells passport to use email to login, instead of default username

module.exports = mongoose.model("User", userSchema);
