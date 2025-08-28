const express = require('express');
const Router = express.Router();
const {createOrder,getOrder,getOrderById} = require('../../controllers/user/ordercontroller');
const {protect} = require('../../middleware/authmiddleware');

Router.post("/createOrder",protect,createOrder);
Router.get("/getOrder",protect,getOrder);
Router.get("/getOrderById/:id",protect,getOrderById);

module.exports = Router;