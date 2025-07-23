const mongoose = require("mongoose");

const GoogleUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user","googleUser"],
    },
  },
  { timestamps: true }
);

const googleuser = mongoose.model("GoogleUser", GoogleUserSchema);

module.exports = googleuser;
