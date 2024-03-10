const express = require('express');
const resumerouter = express.Router();
const multer = require('multer');
const authenticateJWT = require('../utils/middleware')
const {deleteProjectInResume, getallprojects, createResume, deleteresumebyId, getresumebyId, uploadResume, getAllResume } = require("../controllers/resume.controllers")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Set a custom filename for the uploaded file
    const originalName = file.originalname.split('.')[0]; // Get the original filename without the extension
    const uniqueSuffix = Date.now(); // We don't need random characters here
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + originalName + '.' + file.originalname.split('.').pop());
  },
});


const upload = multer({ storage: storage });

// POST route to handle the file upload
resumerouter.post('/upload', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'image', maxCount: 1 }]), uploadResume);

resumerouter.post('/create', authenticateJWT, createResume);
resumerouter.get('/all', getAllResume)
resumerouter.get('/projects', getallprojects)
resumerouter.get('/:id', authenticateJWT, getresumebyId);

resumerouter.delete('/:id', authenticateJWT, deleteresumebyId);
resumerouter.post('/deleteproject', authenticateJWT, deleteProjectInResume);



module.exports = resumerouter;