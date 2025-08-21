const express = require('express');
const Router = express.Router();
const manageProduct = require('../../controllers/admin/manageproductcontroller')

Router.get("/getAllProduct",manageProduct.getAllProduct);
Router.get("/getUnApprovedProduct",manageProduct.getUnApprovedProduct);
Router.put("/approveProduct/:id",manageProduct.approveProduct);
Router.put("/rejectProduct",manageProduct.rejectProduct);

module.exports = Router