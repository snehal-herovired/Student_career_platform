const express = require('express');
const studentrouter = express.Router();
const { registerStudent, loginStudent,
    updateStudentdetails, deleteStudent,
    getstudentbyEmail, getstudentdetailbyId ,getAllStudent} = require("../controllers/student.controllers")

studentrouter.post('/register', registerStudent);
studentrouter.post('/login', loginStudent);
studentrouter.get('/students', getAllStudent);
studentrouter.get('/students/:id', getstudentdetailbyId);
studentrouter.get('/students/email/:email', getstudentbyEmail);
studentrouter.put('/students/:id', updateStudentdetails);
studentrouter.delete('/students/:id', deleteStudent);


module.exports = studentrouter;