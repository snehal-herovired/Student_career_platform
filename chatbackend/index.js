const express = require("express");
const path = require('path')
const morgan = require("morgan");
const helmet = require('helmet')
const cors = require("cors");
const http = require('http');
require("dotenv").config();
const connectDB =require('./config/db.connection');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chat.route");
const { notFound, errorHandler } = require("./middlewares/errorhandler");
const batchrouter = require("./routes/batch.route");
const app =express();
app.use(express.json());
app.use(morgan())
app.use(cors())
connectDB()

//User routes
app.use('/api/user',userRoutes);
app.use('/api/chats',chatRoutes)
app.use('/batch',batchrouter)
app.use(notFound);
app.use(errorHandler)

const Port =process.env.PORT ||5500
app.listen(Port,()=>{
    console.log(`Server running on ${Port}`)
})