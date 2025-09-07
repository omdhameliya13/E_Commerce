const express = require('express');
const Order = require('../../models/order');

const getPendingOrder = async(req,res)=>{
    try {
        const orders = await Order.find().populate("products.productId");
        return res.status(200).json(orders);
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