const express = require('express');
const batchrouter = express.Router();
const { createBatch,getBatchdetailbyid,updateBatch,deleteBatch,addStudenttoBatch,deleteStudentfromBatch,getAllbatches} = require("../controllers/batch.controller")

batchrouter.post('/create', createBatch);
batchrouter.get('/all', getAllbatches);
batchrouter.get('/:id', getBatchdetailbyid);
batchrouter.put('/:id', updateBatch);
batchrouter.post('/:id/students', addStudenttoBatch);
batchrouter.delete('/:id', deleteBatch);
batchrouter.delete('/:id/students/:studentId', deleteStudentfromBatch);


module.exports = batchrouter;