const express = require('express');
const Order = require('../../models/order');
const Product = require('../../models/product');

const getPendingOrder = async(req,res)=>{
    try {
        const {page,limit} = req.query;
        const artistId = req.user.id;
        let pageValue = parseInt(page) || 1;
        let limitValue = parseInt(limit) || 10;
        let skipValue = (pageValue-1)*limitValue;

        const total = await Order.countDocuments({ "products.artist": req.user.id, status: {$in: ["Pending", "Completed"]}});
        const totalPages = Math.ceil(total/limitValue);
        
        console.log(artistId);
        const orders = await Order.find({ "products.artist": artistId, status: {$in: ["Pending", "Completed"]}}).populate("products.productId").skip(skipValue).limit(limitValue);
        console.log(orders);
        return res.status(200).json({orders,totalPages,page,total});
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ message: "Server error" });
    }
}


const getCompletedOrder = async(req,res)=>{
    try {
        const orders = await Order.find({ status:"Completed"}).populate("products.productId");
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

const completeOrder = async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({message:"Order not Found"})
        }
        order.status = "Completed";
        const updateOrder = await order.save();
        return res.status(200).json({message:"Artist verified",updateOrder});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error",error});
    }
}

module.exports = {getPendingOrder,getCompletedOrder,completeOrder};