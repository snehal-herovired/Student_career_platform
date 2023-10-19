const express =require('express');
const { registerUser,auth, getUser } = require('../controllers/user.controller');
const { protect } = require('../middlewares/authmiddleware');
const userRoutes =express.Router();


// using userRoutes.route to chain routes
userRoutes.route('/').post(registerUser).get(protect,getUser);

//simple method : here you cannot change the logic
userRoutes.post('/login',auth)






module.exports=userRoutes;