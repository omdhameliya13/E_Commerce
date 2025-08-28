const express = require('express');
const Router = express.Router();
const {getProfile,logout} = require("../../controllers/artist/profilecontroller");
const {protect} = require('../../middleware/authmiddleware');

Router.get("/getProfile",protect,getProfile);
Router.post("/logout",protect,logout)

module.exports = Router;