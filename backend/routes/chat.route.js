const express = require('express');
const ChatRouter = express.Router();
const authenticateJWT = require('../utils/middleware')
const {getAllMessages}=require('../controllers/chat.controller')

ChatRouter.get('/messages', authenticateJWT, getAllMessages);

module.exports = ChatRouter;