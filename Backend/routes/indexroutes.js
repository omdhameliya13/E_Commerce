const express = require('express');
const Router = express.Router();
const userroutes = require("./user/authroutes");
const artistroutes = require("./artist/authroutes");
const adminroutes = require("./admin/authroutes");

Router.use("/user/auth",userroutes);
Router.use("/artist/auth",artistroutes);
Router.use("/admin/auth",adminroutes);

module.exports = Router;