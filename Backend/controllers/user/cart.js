const express = require('express');
const Cart = require('../../models/cart');
const Product = require('../../models/product')

const addToCart = async(req,res)=>{
    try {
        const userId = req.user.id;
        const {productId,quantity} = req.body;

        const productData = await Product.findById(productId);
        if (!productData) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = new Cart({userId,products:[]});
        }
        const existingProduct = cart.products.find(product=>product.productId.toString()===productId)
        if(existingProduct){
            existingProduct.quantity += quantity;
            existingProduct.price = existingProduct.price || productData.price;
            existingProduct.total = existingProduct.price*existingProduct.quantity;
        }
        else{
            cart.products.push({productId,quantity,price:productData.price,total:productData.price*quantity});
        }
        
        let subTotal = 0;
        for(const p of cart.products){
            subTotal = subTotal+p.total;
        }
        cart.subTotal = subTotal+199;
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
        const cart =  await Cart.findOne({userId}).populate('products.productId');
        if(!cart){
            return res.status(404).json({message:"Your cart is empty"});
        }
        cart.products = cart.products.filter(product=>product.productId.toString() !== productId);

        let subTotal = 0;
        for(const p of cart.products){
            subTotal = subTotal+p.total;
        }
        cart.subTotal = subTotal;
        await cart.save();
        return res.status(200).json({message:"Product Removed from Cart",cart});
    } catch (error) {
        console.log("Error to remove from cart",error);
        return res.status(500).json({message:"Error to remove from cart"});
    }
}

const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    product.quantity = quantity; //  update quantity

    product.total = product.price * quantity;
    let subTotal = 0;
    for(const p of cart.products){
        subTotal = subTotal+p.total;
    }
    cart.subTotal = subTotal;

    await cart.save();

    return res
      .status(200)
      .json({ message: "Quantity updated successfully", cart });
  } catch (error) {
    console.log("Error to update quantity", error);
    return res.status(500).json({ message: "Error to update quantity" });
  }
};


module.exports = {addToCart,getCart,removeFromCart,updateCart};