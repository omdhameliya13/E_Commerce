const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type:String,
    required :true,
    enum:["user",'googleUser']
  },
  BusinessRole:{
    type:String,
    required:true,
    enum:["user","admin","artist"]
  }
},{  timestamps:true});

const User = mongoose.model('User', UserSchema);

module.exports = User;
