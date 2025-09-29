const express = require('express');
const Router = express.Router();
const userauthroutes = require("./user/authroutes");
const artistauthroutes = require("./artist/authroutes");
const adminauthroutes = require("./admin/authroutes");
const manageArtistroutes = require("./admin/manegeartistroutes")
const manageProductroutes = require("./admin/manageproductroutes")
const productroutes = require("./artist/productroutes");
const cartroutes = require('./user/cartroutes');
const adminprofileroutes = require("./admin/profileroutes");
const artistprofileroutes = require("./artist/profileroutes");
const userprofileroutes = require("./user/profileroutes")
const userOrderroutes = require("./user/orderroutes")
const userproductroutes = require("./user/productroutes");
const artistorderroutes = require("./artist/orderroutes");
const adminorder = require("./admin/orderroutes")

Router.use("/user/auth",userauthroutes);
Router.use("/user/profile",userprofileroutes);
Router.use("/user/cart",cartroutes);
Router.use("/user/order",userOrderroutes);
Router.use("/user/product",userproductroutes);

Router.use("/artist/auth",artistauthroutes);
Router.use("/artist/product",productroutes);
Router.use("/artist/profile",artistprofileroutes);
Router.use("/artist/orders",artistorderroutes);

Router.use("/admin/auth",adminauthroutes);
Router.use("/admin/manageArtist",manageArtistroutes);
Router.use("/admin/manageProduct",manageProductroutes);
Router.use("/admin/profile",adminprofileroutes);
Router.use("/admin/orders",adminorder);


module.exports = Router;