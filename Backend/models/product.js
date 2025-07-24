const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: { type: String },
  status:{type:String, default:"Pending" ,enum:["Pending","Aproved","Reject"]},
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const product = mongoose.model("Product", productSchema);

module.exports = product;
