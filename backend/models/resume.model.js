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
    type: String
  },
  description: {
    type:String
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
    type: String,
    
  }
});

// SKILL SCHEMA
const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  proficiency: {
    type: Number,
    default:0
    
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
  about: {
    type: String
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
    },
    github: {
      type: String,
      
    },
    linkedIn: {
      type: String
    },
   
  },
  education: [educationSchema],
  experience: [experienceSchema],
  skills: [skillSchema],
  projects: [projectSchema],
  image: {
    type: String,
 
  },
  resumePdf: {
    type: String,
    
  }
});

// Create the model
const Resume = mongoose.model('Resume', resumeSchema);


module.exports = {
  Resume,

};
