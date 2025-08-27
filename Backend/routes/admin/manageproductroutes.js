const express = require('express');
const Router = express.Router();
const manageProduct = require('../../controllers/admin/manageproductcontroller');
const {protect} = require('../../middleware/authmiddleware');

Router.get("/getAllProduct",protect,manageProduct.getAllProduct);
Router.get("/getUnApprovedProduct",protect,manageProduct.getUnApprovedProduct);
Router.put("/approveProduct/:id",protect,manageProduct.approveProduct);
Router.put("/rejectProduct",protect,manageProduct.rejectProduct);

module.exports = Router