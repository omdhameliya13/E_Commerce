const express = require('express');
const app = express();
app.use(express.json());
const Artist = require('../../models/artist')
const GoogleUser = require('../../models/googleUser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const getUser = async(req,res)=>{
    try{
            const {email,password} = req.body;
            const artist = await Artist.findOne({email});
            if(!artist)
            {
                return res.status(404).json({message:"Artist does not exist"});
            }
            const match = await bcrypt.compare(password,artist.password);
            if(!match)
            {
                return res.status(401).json({message:"Incorrect password"});
            }
            const token = jwt.sign({id:artist._id},process.env.JWT_SECRET,{expiresIn:"2h"});
            return res.status(200).json({message:"Logged in Successfully",token});

        }
        catch(error){
            console.log(error);
            return res.status(500).json({message:"server error",error})
        }
};

const createuser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const artist = await Artist.findOne({email});
        if(artist)
        {
            return res.status(400).json({message:"Artist is already exist!"});
        }
        const hashed = await bcrypt.hash(password,10);
        const newartist = await Artist.create(
            {
                name,
                email,
                password:hashed,
                role:"user",
                BusinessRole:"artist"
            }
        );
        return res.status(201).json({message:"User registered successfully",newartist});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Server Error",error});
        
    }
}

const googleLogin = async(req,res)=>{
    try {
        const googelClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        const token = req.body;
        const ticket = googelClient.verifyIdToken({idToken:token,audience:process.env.GOOGLE_CLIENT_ID})
        const {name,email} = (await ticket).getPayload()

        const user = await GoogleUser.findOne({email});
        if(user)
        {
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});
            return res.status(200).json({message:"Google Login SccessFully",token});
        }

        const newuser = await GoogleUser.create(
            {
                name,
                email,
                role:'googleUser',
                BusinessRole:'artist'
            }
        );

        const newToken = jwt.sign({id:newuser._id},process.env.JWT_SECRET,{expiresIn:'24h'});
        return res.status(201).json({message:"User registered successfully",newToken});



    } catch (error) {
        next(error)
    }
}
module.exports = {getUser,createuser,googleLogin};