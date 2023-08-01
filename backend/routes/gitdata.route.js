const express = require('express');
const gitrouter = express.Router();

const { insertgitData ,getGitDataByStudentId ,generatePDF} = require("../controllers/gitdata.controlles")

gitrouter.post('/post', insertgitData)
gitrouter.get('/:studentId',getGitDataByStudentId)
gitrouter.get('/generate-pdf/:studentId',generatePDF)

module.exports=gitrouter