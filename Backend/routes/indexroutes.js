const express = require('express');
const Router = express.Router();
const userauthroutes = require("./user/authroutes");
const artistauthroutes = require("./artist/authroutes");
const adminauthroutes = require("./admin/authroutes");
const manageArtistroutes = require("./admin/manegeartistroutes")
const manageProductroutes = require("./admin/manageproductroutes")
const productroutes = require("./artist/productroutes");
const cartroutes = require('./user/cartroutes');

Router.use("/user/auth",userauthroutes);
Router.use("/artist/auth",artistauthroutes);
Router.use("/artist/product",productroutes);
Router.use("/admin/auth",adminauthroutes);
Router.use("/admin/manageArtist",manageArtistroutes);
Router.use("/admin/manageProduct",manageProductroutes);
Router.use("/user/cart",cartroutes);

module.exports = Router;