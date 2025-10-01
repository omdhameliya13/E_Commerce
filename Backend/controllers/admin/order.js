const express = require('express');
const Order = require('../../models/order');

const getOrder = async(req,res)=>{
    try {
        const orders = await Order.find().populate({
            path: "products.productId",
            select: "name price artistId",
            populate: { path: "artistId", select: "name" }
        });
        if(!orders){
            return res.status(404).json({message:"No Order Found"});
        }
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {getOrder};