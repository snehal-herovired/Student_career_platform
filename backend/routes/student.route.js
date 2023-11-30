const express = require('express');
const studentrouter = express.Router();
const authenticateJWT =require('../utils/middleware')
const { registerStudent, loginStudent,
    updateStudentdetails, deleteStudent,recentActivity,
    getstudentbyEmail, getstudentdetailbyId ,getAllStudent,getStudentandGitDetailbyId} = require("../controllers/student.controllers")

studentrouter.post('/register', registerStudent);
studentrouter.get('/recent-activity', recentActivity);
studentrouter.post('/login', loginStudent);
studentrouter.get('/students',authenticateJWT, getAllStudent);
studentrouter.get('/students/:id',authenticateJWT, getstudentdetailbyId);
studentrouter.get('/github/:id',authenticateJWT, getStudentandGitDetailbyId);
studentrouter.get('/students/email/:email',authenticateJWT, getstudentbyEmail);
studentrouter.put('/students/:id',authenticateJWT, updateStudentdetails);
studentrouter.delete('/students/:id',authenticateJWT, deleteStudent);


module.exports = studentrouter;