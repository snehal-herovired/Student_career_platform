const express = require('express');
const resumerouter = express.Router();
const multer = require('multer');
const { createResume,deleteresumebyId,getresumebyId,uploadResume} = require("../controllers/resume.controllers")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      // Set a custom filename for the uploaded file (you can use a unique filename here)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
  });
  
  const upload = multer({ storage: storage });
  
  // POST route to handle the file upload
  resumerouter.post('/upload', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'image', maxCount: 1 }]), uploadResume);

resumerouter.post('/create', createResume);
resumerouter.get('/:id', getresumebyId);
resumerouter.delete('/:id', deleteresumebyId);



module.exports = resumerouter;