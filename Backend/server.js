const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const userRouter = require('./routes/userroutes')
const productRouter = require('./routes/productroutes')
const path = require('path');



const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use("/user",userRouter);
app.use('/product', productRouter);

mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("MongoDB Connected")}).catch((err)=>{console.log("Connection Error : ",err)});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
