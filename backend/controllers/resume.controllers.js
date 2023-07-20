const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Resume } = require('../models/resume.model');
const upload = multer({ dest: 'uploads/' });

// Create or Update Resume
const createResume= async (req, res) => {
  const {
    studentId,
    batchId,
    about,
    contactInformation,
    education,
    experience,
    skills,
    projects,
    image,
    resumePdf
  } = req.body;

  try {
    let resume = await Resume.findOne({ studentId });

    if (resume) {
      // Update existing resume
      resume.about = about;
      resume.contactInformation = contactInformation;
      resume.education = education;
      resume.experience = experience;
      resume.skills = skills;
      resume.projects = projects;


      await resume.save();

      return res.status(200).json({ message: 'Resume updated successfully', resume });
    } else {
      // Create new resume
      const newResume = new Resume({
        studentId,
        about,
        batchId,
        contactInformation,
        education,
        experience,
        skills,
        projects,
      
      });

      await newResume.save();

      return res.status(201).json({ message: 'Resume created successfully', resume: newResume });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error creating/updating resume', error });
  }
};

//upload resume
// const uploadResume =  async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const { studentId,batchId } = req.body;

//     // Find the existing resume or create a new one
//     let resume = await Resume.findOne({ studentId});

//     if (!resume) {
//       resume = new Resume({ studentId ,batchId});
//     }
//     resume.image =req.file.path
//     resume.resumePdf = req.file.path;
//     resume.batchId=batchId // Store the file path in the resume model

//     await resume.save();

//     return res.status(200).json({ message: 'File uploaded successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error uploading file' });
//   }
// }

const path = require('path');

const uploadResume = async (req, res) => {
  try {
    const { studentId, batchId } = req.body;

    // Find the existing resume or create a new one
    let resume = await Resume.findOne({ studentId });

    if (!resume) {
      resume = new Resume({ studentId, batchId });
    }

    if (req.files) {
      // Check if 'image' and 'resume' files were uploaded and update the corresponding fields
      if (req.files['image']) {
        resume.image = path.normalize(req.files['image'][0].path);
      }
      if (req.files['resume']) {
        resume.resumePdf = path.normalize(req.files['resume'][0].path);
      }
    }

    await resume.save();

    return res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error uploading files' });
  }
};






// Get Resume by ID
const getresumebyId= async (req, res) => {
    const { id } = req.params;
  
    try {
      const resume = await Resume.findOne({studentId:id}).populate('studentId')
       
      if (!resume) {
        return res.status(404).json({ message: 'Resume not found' });
      }
  
      return res.status(200).json( resume );
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving resume', error });
    }
  };

// Delete Resume by ID
const deleteresumebyId = async (req, res) => {
    const { id } = req.params;

    try {
        const resume = await Resume.findByIdAndRemove(id);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        return res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting resume', error });
    }
};

module.exports = {
    createResume,deleteresumebyId,getresumebyId,uploadResume
}