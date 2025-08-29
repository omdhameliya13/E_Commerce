const mongoose = require('mongoose');

const orederSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    products:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    fullname:{
        type:String,
        required:true
    },
    mobileno:{
        type:String,
        required:true
    },
    flat_houseno:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    landmark:{
        type:String
    },
    pincode:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "Online"],
        default: "COD"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model("Order",orederSchema);

module.exports = Order;