const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    email: {
      type: String,
    required: true,
      unique : true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch',
      required:true
      
    }
});
  
  
const Student = mongoose.model('Student', studentSchema);
module.exports=Student;
