const express = require('express');
const User = require('../../models/user')

const getprofile = async(req,res)=>{
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("name email");

        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({name:user.name,email:user.email});
    } catch (error) {
        return res.status(500).json({message:"Error to fatch user"});
    }
}

const logout = async(req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict"
        });
        return res.status(200).json({message:"Logged out Successfully"});
    } catch (error) {
        return res.status(500).json({message:"Error to logout"});
    }
}

module.exports = {getprofile,logout};