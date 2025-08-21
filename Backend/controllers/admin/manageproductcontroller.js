const express = require('express');
const app = express();
app.use(express.json());
const Product = require('../../models/product');

const getAllProduct = async(req,res)=>{
    try {
        const product = await Product.find();
        if(!product){
           return res.status(404).json({message:"Product not found !"});
        }
        return res.status(200).json({product});
        
    } catch (error) {
        return res.status(500).json({message:"Server Error",error});
    }
}


const getUnApprovedProduct = async(req,res)=>{
    try {
        const product = await Product.find({isapproved:false});
        if(!product){
           return res.status(404).json({message:"Product not found !"});
        }
        return res.status(200).json({product});
        
    } catch (error) {
        return res.status(500).json({message:"Server Error",error});
    }
}

const approveProduct = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not Found"})
        }
        product.isapproved = true;
        const updateProduct = await product.save();
        return res.status(200).json({message:"Artist verified",updateProduct})
    } catch (error) {
        return res.status(500).json({message:"Server Error",error});
    }
}

const rejectProduct = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not Found"})
        }
        product.isapproved = false;
        const updateProduct = await product.save();
        return res.status(200).json({message:"Product Rejected",updateProduct})
    } catch (error) {
        return res.status(500).json({message:"Server Error",error});
    }
}

module.exports = {getAllProduct,getUnApprovedProduct,approveProduct,rejectProduct};