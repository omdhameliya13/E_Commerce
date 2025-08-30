const express = require('express');
const multer = require('multer');
const Product = require('../../models/product');

const addproduct = async(req,res)=>{
    try {
        const { name, description,category, price,stock,color,size } = req.body;
        //const image = req.file ? req.file.filename : null;
        const artistId = req.user.id;
        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

        const product = new Product({
            name,
            description,
            category,
            price,
            image: req.file ? `uploads/${req.file.filename}` : null,
            stock,
            color,
            size,
            artistId
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
        const artistId = req.user.id;
        const product = await Product.find({artistId});
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

const getproductById = async(req,res)=>{
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
        const {id} = req.params;
        console.log("Updating product ID:", id);
        console.log("Body:", req.body);
        console.log("File:", req.file);
        const product = await Product.findById(id);
        if (!product) {
        return res.status(404).json({ message: "Product not found" });
        }

        // update fields
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.category = req.body.category || product.category;
        product.price = req.body.price || product.price;
        product.stock = req.body.stock || product.stock;

        // only update image if new file uploaded
        if (req.file) {
            product.image = req.file.path; // new upload
            } else if (req.body.image) {
            product.image = req.body.image; // keep old one
            }

        await product.save();

        res.status(200).json({ message: "Product updated successfully", product });
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {addproduct,deleteproduct,getproduct,updateproduct,getproductById};
