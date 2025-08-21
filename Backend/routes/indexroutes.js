const express = require('express');
const Router = express.Router();
const userauthroutes = require("./user/authroutes");
const artistauthroutes = require("./artist/authroutes");
const adminauthroutes = require("./admin/authroutes");
const manageArtistroutes = require("./admin/manegeartistroutes")

Router.use("/user/auth",userauthroutes);
Router.use("/artist/auth",artistauthroutes);
Router.use("/admin/auth",adminauthroutes);
Router.use("/admin/manageartist",manageArtistroutes);

module.exports = Router;