const mongoose = require('mongoose');

const GoogleUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role:{
    type:String,
    required :true,
  },
}, {  timestamps:true});

const googleuser = mongoose.model('GoogleUser', GoogleUserSchema);

module.exports = googleuser;
