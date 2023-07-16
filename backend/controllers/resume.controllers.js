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
      resume.contactInformation = contactInformation;
      resume.education = education;
      resume.experience = experience;
      resume.skills = skills;
      resume.projects = projects;
      resume.image = image;
      resume.resumePdf = resumePdf;

      await resume.save();

      return res.status(200).json({ message: 'Resume updated successfully', resume });
    } else {
      // Create new resume
      const newResume = new Resume({
        studentId,
        batchId,
        contactInformation,
        education,
        experience,
        skills,
        projects,
        image,
        resumePdf
      });

      await newResume.save();

      return res.status(201).json({ message: 'Resume created successfully', resume: newResume });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error creating/updating resume', error });
  }
};

//upload resume
const uploadResume =  async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { studentId,batchId } = req.body;

    // Find the existing resume or create a new one
    let resume = await Resume.findOne({ studentId});

    if (!resume) {
      resume = new Resume({ studentId ,batchId});
    }

    resume.resumePdf = req.file.path;
    resume.batchId=batchId // Store the file path in the resume model

    await resume.save();

    return res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error uploading file' });
  }
}





// Get Resume by ID
const getresumebyId= async (req, res) => {
    const { id } = req.params;
  
    try {
      const resume = await Resume.findOne({studentId:id})
       
      if (!resume) {
        return res.status(404).json({ message: 'Resume not found' });
      }
  
      return res.status(200).json({ resume });
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