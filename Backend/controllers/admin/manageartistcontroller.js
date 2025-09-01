const express = require('express');
const app = express();
app.use(express.json());
const Artist = require('../../models/artist');

const getAllArtist = async(req,res)=>{
    try {
        const artists = await Artist.find();
        if(!artists){
           return res.status(404).json({message:"Artist not found !"});
        }
        return res.status(200).json({artists});
        
    } catch (error) {
        return res.status(500).json({message:"Server Error",error});
    }
}


const getArtistById = async(req,res)=>{
    try {
        const artist = await Artist.findById(req.params.id);
        if(!artist){
           return res.status(404).json({message:"Artist not found !"});
        }
        return res.status(200).json({artist});
        
    } catch (error) {
        return res.status(500).json({message:"Server Error",error});
    }
}

const verifyArtist = async(req,res)=>{
    try {
        const artist = await Artist.findById(req.params.id);
        if(!artist){
            return res.status(404).json({message:"Artist not Found"})
        }
        artist.isverified = true;
        const updateartist = await artist.save();
        return res.status(200).json({message:"Artist verified",updateartist})
    } catch (error) {
        return res.status(500).json({message:"Server Error",error});
    }
}

const rejectArtist = async(req,res)=>{
    try {
        const artist = await Artist.findById(req.params.id);
        if(!artist){
            return res.status(404).json({message:"Artist not Found"})
        }
        artist.isverified = false;
        const updateartist = await artist.save();
        return res.status(200).json({message:"Artist Rejected",updateartist})
    } catch (error) {
        return res.status(500).json({message:"Server Error",error});
    }
}

module.exports = {getAllArtist,getArtistById,verifyArtist,rejectArtist};