const express = require('express');
const gitrouter = express.Router();
const authenticateJWT =require('../utils/middleware')
const { insertgitData ,getGitDataByStudentId ,generatePDF} = require("../controllers/gitdata.controlles")

gitrouter.post('/post', insertgitData)
gitrouter.get('/:studentId',authenticateJWT,getGitDataByStudentId)
gitrouter.get('/generate-pdf/:studentId',authenticateJWT,generatePDF)

module.exports=gitrouter