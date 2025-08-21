const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
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
    enum:["artist"]
  },
  isverified:{
    type:Boolean,
    default:false,
  }
});


const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;
