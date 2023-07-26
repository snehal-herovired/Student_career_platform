const express = require('express');
const gitrouter = express.Router();

const { insertgitData ,getGitDataByStudentId } = require("../controllers/gitdata.controlles")

gitrouter.post('/post', insertgitData)
gitrouter.get('/:studentId',getGitDataByStudentId)

module.exports=gitrouter