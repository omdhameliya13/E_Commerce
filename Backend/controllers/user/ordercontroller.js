const express = require('express');
const Order = require('../../models/order');
const Cart = require("../../models/cart");
const Product = require("../../models/product");

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      fullname,
      mobileno,
      email,
      address,
      city,
      pincode,
      state,
      paymentMethod,
    } = req.body;

    // fetch user's cart with product details
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart || cart.products.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // calculate total amount
    let totalAmount = 0;
    cart.products.forEach((product) => {
      totalAmount += product.productId.price * product.quantity;
    });
    totalAmount = totalAmount + 199; // delivery charges, for example

    // map products and attach artist to each product
    const productsWithArtist = await Promise.all(
      cart.products.map(async (p) => {
        const productDoc = await Product.findById(p.productId._id).select("artist price");
        if (!productDoc) {
          throw new Error(`Product not found: ${p.productId._id}`);
        }
        return {
          productId: p.productId._id,
          quantity: p.quantity,
          artist: productDoc.artist, // attach artist
        };
      })
    );

    // create new order
    const newOrder = new Order({
      userId,
      products: productsWithArtist,
      totalAmount,
      fullname,
      mobileno,
      email,
      address,
      city,
      pincode,
      state,
      paymentMethod,
    });

    await newOrder.save();

    // clear user's cart
    cart.products = [];
    await cart.save();

    return res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Error creating order", error: error.message });
  }
};


const getOrder = async(req,res)=>{
    try {
        const userId = req.user.id;
        const {page,limit} = req.query;
        let pageValue = parseInt(page) || 1;
        let limitValue = parseInt(limit) || 10;
        let skipValue = (pageValue-1)*limitValue;

        const total = await Order.countDocuments({ userId });
        const totalPages = Math.ceil(total/limitValue);
        const orders = await Order.find({ userId }).populate("products.productId");
        return res.status(200).json({orders,totalPages,page,total});
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