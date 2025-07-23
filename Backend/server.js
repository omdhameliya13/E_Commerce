const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express(); 

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("Mongo DB connected");
})
.catch((err)=>{
  console.log("Error to Connect MongoDB",err.message);
  process.exit(1);
});
app.listen(process.env.PORT, () => {
  console.log(` Server is running on port ${process.env.PORT}`);
});
