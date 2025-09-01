const express = require('express');
const Router = express.Router();
const manageArtist = require('../../controllers/admin/manageartistcontroller')
const {protect} = require('../../middleware/authmiddleware');

Router.get("/getAllArtist",protect,manageArtist.getAllArtist);
Router.get("/getArtistById/:id",protect,manageArtist.getArtistById);
Router.put("/verifyArtist/:id",protect,manageArtist.verifyArtist);
Router.put("/rejectArtist/:id",protect,manageArtist.rejectArtist);

module.exports = Router