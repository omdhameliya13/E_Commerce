const express = require('express');
const Order = require('../../models/order');
const Cart = require("../../models/cart");
const Product = require("../../models/product");

const createOrder = async(req,res)=>{
    try {
        const userId = req.user.id;
        const{fullname,mobileno,email,address,city,pincode,state,paymentMethod} = req.body;

        const cart = await Cart.findOne({userId}).populate("products.productId");
        if(!cart){
            return res.status(404).json({message:"Cart is Empty"});
        }

        let totalAmount = 0;
        cart.products.forEach(product => {
            totalAmount += product.productId.price*product.quantity;
        });
        totalAmount = totalAmount+199;

        const newOrder = new Order({
            userId,
            products : cart.products.map(product=>({
                productId : product.productId._id,
                quantity : product.quantity
            })),
            totalAmount,
            fullname,
            mobileno,
            email,
            address,
            city,
            pincode,
            state,
            paymentMethod
        });

        await newOrder.save();

        cart.products = [];
        await cart.save();
        return res.status(201).json({message: "Order placed successfully",order: newOrder});
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Error creating order" })
    }
};

const getOrder = async(req,res)=>{
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId }).populate("products.productId");
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate("products.productId");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {createOrder,getOrder,getOrderById};