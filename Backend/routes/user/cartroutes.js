const express = require('express');
const Router = express.Router();
const {addToCart,getCart,removeFromCart} = require('../../controllers/user/cart');
const {protect} = require('../../middleware/authmiddleware');

Router.post("/addToCart",protect,addToCart);
Router.get("/getCart",protect,getCart);
Router.post("/removeFromCart",protect,removeFromCart);

module.exports = Router;