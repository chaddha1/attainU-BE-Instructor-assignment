const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userRole: { type: String, required: true, default: "student" },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
