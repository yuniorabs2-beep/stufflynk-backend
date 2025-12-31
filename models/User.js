const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

// Middleware para encriptar contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Si la contraseña guardada parece un hash bcrypt, usar compare
  if (this.password.startsWith("$2a$") || this.password.startsWith("$2b$")) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
  // Si está en texto plano (usuarios viejos), comparar directo
  return enteredPassword === this.password;
};

const User = mongoose.model("User", userSchema);

module.exports = User;