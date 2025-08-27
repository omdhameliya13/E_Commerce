const express = require('express');
const Cart = require('../../models/cart');

const addToCart = async(req,res)=>{
    try {
        const userId = req.user.id;
        const {productId,quantity} = req.body;
        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = new Cart({userId,products:[]});
        }
        const existingProduct = cart.products.find(product=>product.productId.toString()===productId)
        if(existingProduct){
            existingProduct.quantity += quantity;
        }
        else{
            cart.products.push({productId,quantity});
        }
        await cart.save();
        return res.status(200).json({message:"Product added successfully",cart});
    } catch (error) {
        console.log("Error to add Product",error);
        return res.status(500).json({message:"Error to add Product"});
    }
}

const getCart = async(req,res)=>{
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({userId}).populate("products.productId");
        if(!cart){
            return res.status(404).json({message:"Your Cart is empty"});
        }
        return res.status(200).json(cart);
    } catch (error) {
        console.log("Error to fatch Product",error);
        return res.status(500).json({message:"Error to fetch Product"});
    }
}

const removeFromCart = async(req,res)=>{
    try {
        const userId = req.user.id;
        const{productId} = req.body;
        const cart =  await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({message:"Your cart is empty"});
        }
        cart.products = cart.products.filter(product=>product.productId.toString() !== productId);
        await cart.save();
        return res.status(200).json({message:"Product Removed from Cart",cart});
    } catch (error) {
        console.log("Error to remove from cart",error);
        return res.status(500).json({message:"Error to remove from cart"});
    }
}

module.exports = {addToCart,getCart,removeFromCart};