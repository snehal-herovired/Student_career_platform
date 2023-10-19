const Chat = require('../models/chat.model');
const asynchandler = require('express-async-handler');
const User = require('../models/user.model');

const accessChat = asynchandler(async (req, res) => {
    // taking userid from req.body;
    const { userId } = req.body;

    // note we are accesing chat btw two people not group chat;
    if (!userId) {
        console.log('userid not sent from request');
        return res.sendStatus(400);
    }
    let isChat = await Chat.find({
        isGroupChat: false,
        users: {
            $all: [req.user._id, userId],
            $size: 2 // Ensure there are exactly 2 users in the chat
        }
    }).populate('users', '-password').populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name pic email'
    })

    if (isChat.length > 0) {
        //only single chat will exists with the userid and the current user
        console.log(isChat[0], 'existing chat');
        res.send(isChat[0])
    } else {
        let chatdata = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId]
        }
        try {
            //creating new chat if chat not exists
            const createdChat = await Chat.create(chatdata);
            const fullChat = await Chat.find({ _id: createdChat._id }).populate('users', '-password');
            res.status(200).send(fullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message)

        }
    }
})

const fetchChats = asynchandler(async (req, res) => {
    try {
        let chatforUser = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).populate('users', '-password').populate('groupAdmin', '-password').populate('latestMessage').sort({ updatedAt: -1 });

        chatforUser=await User.populate(chatforUser, {
            path: 'latestMessage.sender',
            select: 'name pic email'
        })
    
        if (chatforUser.length > 0) {
            return res.send(chatforUser)
        }
        return res.status(400).send("no chats")
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})
module.exports = {
    accessChat,
    fetchChats
}