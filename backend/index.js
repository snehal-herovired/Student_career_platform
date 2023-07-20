
const express = require("express");
const path =require('path')
const morgan = require("morgan");
const helmet = require('helmet')
const cors = require("cors");
const app = express();
require("dotenv").config();

// middleware enabling
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

//PORT
const Port = process.env.PORT;
// Enabling the database ;
const { configDb } = require('./connection')
configDb();


console.log(path.join(__dirname, 'uploads'));
// ROUTE IMPORTS
app.use('/student', require('./routes/student.route'));
app.use('/user', require('./routes/user.route'))
app.use('/batch', require('./routes/batch.route'))
app.use('/resume', require('./routes/resume.route'))

app.get('/fetch-resume/uploads/:filename', (req, res) => {
    const { filename } = req.params;
    console.log(filename,"filename");
    const filePath = path.join(__dirname,'uploads', filename); // Adjust the path to the location of your resume files

    res.sendFile(filePath);
});








app.listen(Port, (error) => {
    if (!error) {

        console.log(`server is running on PORT ${Port}`);
    }

});