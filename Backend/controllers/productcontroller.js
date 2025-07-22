const express = require('express');
const multer = require('multer');
const Product = require('../models/product');

const addproduct = async(req,res)=>{
    try {
        const { name, description, price } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

        const product = new Product({
            name,
            description,
            price,
            image
        });

        await product.save();

        return res.status(201).json({
            message: 'Product added successfully',
            product
        });

    } catch (error) {
        console.error('Add product error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const deleteproduct = async(req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({message:"No Product Found"});
        }
        return res.status(200).json({message:"Product Deleted"});
    }
    catch(error){
        return res.status(500).json({ message: 'Server error' });
    }
};

const getproduct = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product)
        {
            return res.status(404).json({message:"Product not Found"});
        }
        return res.status(200).json(product);
    }
    catch(err){
        return res.status(500).json({ message: 'Server error' });
    }
}

const updateproduct = async(req,res)=>{
    try{
        const id = req.params.id;
        const {name,description,price} = req.body;
        const image = req.file ? req.file.filename : null;
        const updateData = { name, description, price };
        if (image) {
            updateData.image = image;
        }
        const updateproduct = await Product.findByIdAndUpdate(id,updateData,{new:true});
        if(!updateproduct)
        {
            return res.status(404).json({message:"Item Not found"});
        }
        return res.status(200).json({message:"Item Updated",updateproduct});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {addproduct,deleteproduct,getproduct,updateproduct};

