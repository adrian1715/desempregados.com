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
      required: [true, "O e-mail é obrigatório."],
      unique: true,
      match: [
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Insira um e-mail válido.",
      ],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: {
        values: ["candidate", "company"],
        message: "Tipo de usuário inválido. Deve ser 'candidate' ou 'company'.",
      },
      required: [true, "O tipo de usuário (role) é obrigatório."],
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Perfil associado é obrigatório."],
      refPath: "role",
    },
  },
  { timestamps: true }
);

// async validator to provide a friendly message for unique email
userSchema.path("email").validate(async function (value) {
  const count = await mongoose.models.User.countDocuments({
    email: value,
    _id: { $ne: this._id },
  });
  return count === 0;
}, "Este e-mail já está em uso.");

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
