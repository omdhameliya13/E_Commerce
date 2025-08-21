const express = require('express');
const Router = express.Router();
const manageArtist = require('../../controllers/admin/manageartistcontroller')

Router.get("/getAllArtist",manageArtist.getAllArtist);
Router.get("/getUnVerifiedArtist",manageArtist.getUnVerifiedArtist);
Router.put("/verifyArtist/:id",manageArtist.verifyArtist);
Router.put("/rejectArtist",manageArtist.rejectArtist);

module.exports = Router