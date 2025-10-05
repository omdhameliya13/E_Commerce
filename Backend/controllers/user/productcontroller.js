const express = require('express');
const Product = require('../../models/product');

const getproduct = async(req,res)=>{
    try{
        

        
        const products = await Product.find()
        if(!products)
        {
            return res.status(404).json({message:"Product not Found"});
        }
        return res.status(200).json({products});
    }
    catch(err){
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {getproduct};