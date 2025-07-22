const express = require('express');
const userRouter = express.Router();
const userController = require("../controllers/usercontroller");

userRouter.post("/login",userController.getUser);
userRouter.post("/register",userController.createuser);

module.exports = userRouter;