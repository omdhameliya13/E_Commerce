const express = require('express');
const Router = express.Router();
const {getprofile,logout} = require("../../controllers/admin/profilecontroller");
const {protect} = require('../../middleware/authmiddleware');

Router.get("/getProfile",protect,getprofile);
Router.post("/logout",protect,logout)

module.exports = Router;