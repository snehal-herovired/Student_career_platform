
const express = require("express");
const path = require('path')
const morgan = require("morgan");
const helmet = require('helmet')
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
const Message = require('./models/studentforum.model')
const app = express();
const axios = require('axios')
const bodyParser = require('body-parser');
require("dotenv").config();

// middleware enabling
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'https://viredstore.prashantdey.in/',
    methods: ['GET', 'POST']
  }
});
// console.log(io, "SOCKET Server");
const activeUsers = {};
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('join', async(userData) => {
    const user = await Student.findById({ _id: userData._id })
    console.log(user);
    
    activeUsers[socket.id] = {
      id: socket.id,
      name: user.username,
      isActive: true,
    };
    io.emit('activeUsers', Object.values(activeUsers));
  });
  socket.on('message', async (data) => {
    const newMessage = new Message(data);
    await newMessage.save();
    // Populate sender field before emitting the message
    const populatedMessage = await Message.findById(newMessage._id).populate('sender');
    // console.log(populatedMessage);
    io.emit('message', populatedMessage);
  });

  socket.on('disconnect', () => {
    if (activeUsers[socket.id]) {
      activeUsers[socket.id].isActive = false;
      io.emit('activeUsers', Object.values(activeUsers));
      delete activeUsers[socket.id];
    }
    console.log('User disconnected');
  });
});
//PORT
const Port = process.env.PORT;
// Enabling the database ;
const { configDb } = require('./connection');
const Student = require("./models/Student.model");
configDb();


console.log(path.join(__dirname, 'uploads'));
// ROUTE IMPORTS
// app.get('/github/:username', async (req, res) => {
//     const { username } = req.params;
//     console.log(username);
//     try {
//         const apiUrl = `https://api.github.com/users/${username}`;
//         const response = await axios.get(apiUrl);
//         console.log(response.data);
//         const userData = {
//             username: response.data.login,
//             total_repositories: response.data.public_repos,
//             name: response.data.name || 'Not specified',
//             bio: response.data.bio || 'Not specified',
//             location: response.data.location || 'Not specified',
//         };
//         res.json(userData);
//     } catch (error) {
//         res.status(error.response?.status || 500).json({ error: 'Error fetching GitHub account details' });
//     }
// });

app.use('/student', require('./routes/student.route'));
app.use('/gitdata', require("./routes/gitdata.route"))
app.use('/user', require('./routes/user.route'))
app.use('/batch', require('./routes/batch.route'))
app.use('/resume', require('./routes/resume.route'));
app.use('/forum',require('./routes/chat.route'))

app.get('/fetch-resume/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  console.log(filename, "filename");
  const filePath = path.join(__dirname, 'uploads', filename); // Adjust the path to the location of your resume files

  res.sendFile(filePath);
});








server.listen(Port, (error) => {
  if (!error) {

    console.log(`server is running on PORT ${Port}`);
  }

});