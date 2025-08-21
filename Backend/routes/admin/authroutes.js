const express = require('express');
const Router = express.Router();
const authController = require("../../controllers/admin/authcontroller");

Router.post("login",authController.getUser);
Router.post("register",authController.createuser);

module.exports = Router;