const express = require('express');
const Router = express.Router();
const order = require('../../controllers/artist/ordercontroller');
const {protect} = require('../../middleware/authmiddleware');

Router.get("/getPendingOrder",protect,order.getPendingOrder);
Router.get("/getCompletedOrder",protect,order.getCompletedOrder);
Router.put("/completeOrder/:id",protect,order.completeOrder);

module.exports = Router;