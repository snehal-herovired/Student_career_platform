const mongoose = require('mongoose');

// defining the EXPERIENCE SCHEMA
const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: ''
  }
});

// EDUCATION SCHEMA 
const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    default: ''
  },
  degree: {
    type: String,
    default: ''
  },
  year: {
    type: Number,
    default: 0
  }
});

// SKILL SCHEMA
const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  proficiency: {
    type: String,
    default: ''
  }
});

// PROJECT SCHEMA
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  technologies: {
    type: [String],
    default: []
  },
  link: {
    type: String,
    default: ''
  }
});





// Define the schema
const resumeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch',
    required: true
  },
  contactInformation: {
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    }
  },
  education: [educationSchema],
  experience: [experienceSchema],
  skills: [skillSchema],
  projects: [projectSchema],
  image: {
    type: String,
    default: 'default.jpg'
  },
  resumePdf: {
    type: String,
    default: ''
  }
});

// Create the model
const Resume = mongoose.model('Resume', resumeSchema);


module.exports = {
  Resume,
 
};
