const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
require('dotenv').config();
const indexroutes = require('./routes/indexroutes');


const app = express(); 
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use('/api/v1',indexroutes);



mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("Mongo DB connected");
  app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
})
.catch((err)=>{
  console.log("Error to Connect MongoDB",err.message);
  process.exit(1);
});

