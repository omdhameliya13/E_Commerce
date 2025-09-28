const mongoose = require('mongoose');

const cart = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true,
        },
        quantity:{
            type:Number,
            default:1
        },
        price:{
            type:Number,
            required:true
        },
        total:{
            type:Number,
            default:0
        }
    }],
    subTotal:{
        type:Number,
        required:true
    }
});

const Cart = mongoose.model('Cart',cart);

module.exports = Cart;