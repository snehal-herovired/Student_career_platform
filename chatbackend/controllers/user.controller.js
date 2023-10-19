const { generateToken } = require('../config/generateToken');
const User = require('../models/user.model');
const Batch =require('../models/batch.model')
const mongoose=require('mongoose')
// we are using express-async-handler , to handle unexpected error in async body;
const asynchandler = require('express-async-handler');


const registerUser = async (req, res) => {
    const { name, email, password, pic, batchId } = req.body;

    if(!name || !email || !password || !batchId){
        res.status(400);
        throw new Error('please enter all fields')
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const userdata= await User.findOne({email});
        if(userdata){
            return res.status(400).json({message:"user already exists in db"})
        }
        // Create the user
        const user = await User.create(
            { name, email, password, pic, batchId },
           
        );

        // Update the batch with the new user
        const batch = await Batch.findById(batchId).session(session);
        if (!batch) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Batch not found' });
        }

        batch.students.push(user._id);
        await batch.save();

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Error creating user', error });
    }
};

const auth = asynchandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('batchId');
    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            user,
            token: generateToken(user._id),
            message: 'You are logged in'
        })
    }else{
        res.status(400);
        throw new Error('Invalide useremail or password');
    }
})

const getUser =asynchandler(async(req,res)=>{
let keyword =req.query.search ?{
    $or:[
        {name:{$regex:req.query.search,$options:'i'}},
        {email:{$regex:req.query.search,$options:'i'}},
    ]
}:{}
const users =await User.find(keyword).find({_id:{$ne:req.user._id}})
res.json({
    message:'list of user except current',
    users
})

console.log(keyword);
})
module.exports = {
    registerUser,
    auth,getUser
}