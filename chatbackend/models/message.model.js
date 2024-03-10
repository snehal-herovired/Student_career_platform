const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//will contain 3 things :sender,content of message and ref id to chat to which it belongs.
const messageSchema = new Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
},{
    timestamps:true,
})


const Message = mongoose.model('Message', messageSchema);
module.exports = Message;