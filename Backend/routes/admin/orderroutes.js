const express = require('express');
const Router = express.Router();
const order = require('../../controllers/admin/order');
const {protect} = require('../../middleware/authmiddleware');

Router.get("/getOrders",protect,order.getOrder);

module.exports = Router;