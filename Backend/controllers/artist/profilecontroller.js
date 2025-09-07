const express = require('express');
const Artist = require('../../models/artist');

const getProfile = async(req,res)=>{
    try {
        const userId = req.user.id;
        const user = await Artist.findById(userId).select("name email isverified");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({name:user.name,email:user.email,isverified:user.isverified});
    } catch (error) {
        return res.status(500).json({message: "Error to fetch User data",error});
    }
}

const logout = async(req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict"
        })
        return res.status(200).json({message:"Logged out Successfully"});
    } catch (error) {
        return res.status(500).json({message: "Error to Logout",error});
    }
}

module.exports = {getProfile,logout};