const express = require('express');
const userrouter = express.Router();
const {   registerUser,loginUser,deleteUser,updateUser,userbyEmail,userbyId } = require("../controllers/user.controller")
const middleware =require('../utils/middleware')
userrouter.post('/register', registerUser);
userrouter.post('/login', loginUser);

//authorised routes

userrouter.get('/user/:id',middleware, userbyId);
userrouter.get('/user/email/:email', userbyEmail);
userrouter.put('/user/:id', updateUser);
userrouter.delete('/user/:id', deleteUser);


module.exports = userrouter;