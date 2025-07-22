const express = require('express');
const app = express();
app.use(express.json());
const User = require('../models/user')
const GoogleUser = require('../models/googleUser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const getUser = async(req,res)=>{
    try{
            const {email,password} = req.body;
            const user = await User.findOne({email});
            if(!user)
            {
                return res.status(404).json({message:"User does not exist"});
            }
            const match = await bcrypt.compare(password,user.password);
            if(!match)
            {
                return res.status(400).json({message:"Incorrect password"});
            }
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"2h"});
            return res.status(200).json({message:"Logged in Successfully",token});

        }
        catch(error){
            console.log(error);
            return res.status(500).json({message:"server error",error})
        }
};

const createuser = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        const user = await User.findOne({email});
        if(user)
        {
            return res.status(400).json({message:"User is already exist!"});
        }
        const hashed = await bcrypt.hash(password,10);
        const newuser = await User.create(
            {
                name,
                email,
                password:hashed,
                role
            }
        );
        return res.status(201).json({message:"User registered successfully",newuser});
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
                role
            }
        );

        const newToken = jwt.sign({id:newuser._id},process.env.JWT_SECRET,{expiresIn:'24h'});
        return res.status(201).json({message:"User registered successfully",newToken});



    } catch (error) {
        next(error)
    }
}
module.exports = {getUser,createuser,googleLogin};