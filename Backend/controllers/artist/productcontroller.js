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

const updateproduct = async(req,res)=>{
    try{
        const id = req.params.id;
        const {name, description,category, price,color,size} = req.body;
        const updateData = { name, description,category, price,color,size };
        if (req.file) {
            updateData.image = req.file.filename;
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
