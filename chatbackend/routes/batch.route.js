const express = require('express');
const batchrouter = express.Router();
const { createBatch,getBatchdetailbyid,getAllbatches,addStudenttoBatch,deleteStudentfromBatch} = require("../controllers/batch.controller")

batchrouter.post('/create', createBatch);
batchrouter.get('/all', getAllbatches);
batchrouter.get('/:id', getBatchdetailbyid);

batchrouter.post('/:id/user', addStudenttoBatch);

batchrouter.delete('/:id/students/:studentId', deleteStudentfromBatch);


module.exports = batchrouter;