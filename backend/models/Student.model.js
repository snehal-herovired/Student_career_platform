const mongoose = require('mongoose');
const {Resume}=require('./resume.model')
const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
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
    required: true

  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
});

studentSchema.pre('remove', async function (next) {
  try {
      // Assume Resume is your resume model
     let resumedeleted= await Resume.deleteOne({ studentId: this._id });
     console.log("resume deleted",resumedeleted);
      next();
  } catch (error) {
      next(error);
  }
});
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
