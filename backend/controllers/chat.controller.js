// const Message = require('../models/studentforum.model');

const getAllMessages = async (req, res) => {
    try {
        const allMessages = await Message.find().populate('sender');
        if (allMessages.length < 1) {
            return res.status(403).json({ error: 'No messages found' });
        }
        return res.status(200).json(allMessages)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllMessages
}