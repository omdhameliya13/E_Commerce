const express = require('express');
const app = express();
app.use(express.json());
const Artist = require('../../models/artist');

const getAllArtist = async(req,res)=>{
    try {
        const {page,limit,filter} = req.query;
        let pageValue = parseInt(page) || 1;
        let limitValue = parseInt(limit) || 5;
        let skipValue = (pageValue - 1)*limitValue; 

        let query = {};
        if(filter==="verified"){
            query.isverified = true;
        }
        if(filter==="unverified"){
            query.isverified = false;
        }

        const countTotal = await Artist.countDocuments(query);
        const totalPages = Math.ceil(countTotal/limitValue);

        const artists = await Artist.find(query).skip(skipValue).limit(limitValue);

        if(!artists || artists.length === 0){
           return res.status(404).json({message:"Artist not found !"});
        }
        return res.status(200).json({artists,totalPages,page,countTotal});
        
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