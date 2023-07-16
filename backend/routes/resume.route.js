const express = require('express');
const resumerouter = express.Router();
const multer = require('multer');
const { createResume,deleteresumebyId,getresumebyId,uploadResume} = require("../controllers/resume.controllers")
const upload = multer({ dest: 'uploads/' });

resumerouter.post('/upload',upload.single('resume'),uploadResume)
resumerouter.post('/create', createResume);
resumerouter.get('/:id', getresumebyId);
resumerouter.delete('/:id', deleteresumebyId);



module.exports = resumerouter;