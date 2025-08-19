const express = require('express');
const Router = express.Router();
const userroutes = require("./user/authroutes");
const artistroutes = require("./artist/authroutes");
const adminroutes = require("./admin/authroutes");

Router.use("/user",userroutes);
Router.use("/artist",artistroutes);
Router.use("/admin",adminroutes);

module.exports = Router;