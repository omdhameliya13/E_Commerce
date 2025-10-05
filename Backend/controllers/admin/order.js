const express = require('express');
const Order = require('../../models/order');

const getOrder = async(req,res)=>{
    try {
        const {page,limit} = req.query;
        let pageValue = parseInt(page) || 1;
        let limitValue = parseInt(limit) || 10;
        let skipValue = (pageValue-1)*limitValue;
        
        const total = await Order.countDocuments({ status: { $in: ["Pending", "Completed"] } });
        const totalPages = Math.ceil(total/limitValue);
       const orders = await Order.find({
        status: { $in: ["Pending", "Completed"] },
        }).populate({
            path: "products.productId",
            populate: { path: "artist", select: "name" } // populate artist name from product
        }).skip(skipValue).limit(limitValue);
        if(!orders){
            return res.status(404).json({message:"No Order Found"});
        }
        return res.status(200).json({orders,totalPages,page,total});
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {getOrder};