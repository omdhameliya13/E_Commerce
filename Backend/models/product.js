const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: {
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  price: { 
    type: Number,
    required: true 
  },
  image: { 
      type: String,
      required:true
  },
  stock: {
    type: Number,
  },
  color:{
    type:String
  },
  size:{
    type:String
  },
  artist: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist", 
    required: true 
  },
  isapproved:{
    type:Boolean,
    default:false,
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
