const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: null },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", postsSchema);
