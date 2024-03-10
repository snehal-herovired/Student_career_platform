const express = require('express');
const authenticateJWT =require('../utils/middleware')
const userrouter = express.Router();
const {   registerUser,loginUser,deleteUser,updateUser,userbyEmail,userbyId } = require("../controllers/user.controller")
const middleware =require('../utils/middleware')
userrouter.post('/register', registerUser);
userrouter.post('/login', loginUser);

//authorised routes

userrouter.get('/user/:id',authenticateJWT, userbyId);
userrouter.get('/user/email/:email',authenticateJWT, userbyEmail);
userrouter.put('/user/:id',authenticateJWT, updateUser);
userrouter.delete('/user/:id',authenticateJWT, deleteUser);


module.exports = userrouter;