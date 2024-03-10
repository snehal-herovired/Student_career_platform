const mongoose =require('mongoose');

const Schema =mongoose.Schema;

const chatSchema =new Schema({
  chatName:{
    type:String,
    trim :true  // this is done to aviod the trailing spaces 
 },
 isGroupChat:{type:Boolean,default:false},
 users:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }
 ],
 latestMessage:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Message'
 },
 groupAdmin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users'
 }
},{
    timestamps:true,
})

const Chat =mongoose.model('Chat',chatSchema);

module.exports=Chat;