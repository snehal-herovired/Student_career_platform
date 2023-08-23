const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Resume } = require('../models/resume.model');
const upload = multer({ dest: 'uploads/' });
const parseResumeData = require('../utils/resumeParser');
const authenticateJWT =require('../utils/middleware')
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



const path = require('path');

// const uploadResume = async (req, res) => {
//   try {
//     const { studentId, batchId } = req.body;

//     // Find the existing resume or create a new one
//     let resume = await Resume.findOne({ studentId });

//     if (!resume) {
//       resume = new Resume({ studentId, batchId });
//     }

//     if (req.files) {
//       // Check if 'image' and 'resume' files were uploaded and update the corresponding fields
//       if (req.files['image']) {
//         resume.image = path.normalize(req.files['image'][0].path);
//       }
//       if (req.files['resume']) {
//         resume.resumePdf = path.normalize(req.files['resume'][0].path);
//       }
//     }

//     await resume.save();

//     return res.status(200).json({ message: 'Files uploaded successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error uploading files' });
//   }
// };
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
        // Parse the resume PDF using the parser function
        const pdfPath = path.resolve(__dirname, '..', resume.resumePdf);
        const parsedData = parseResumeData(pdfPath);

        // Map the parsed information to your resume model
        resume.contactInformation.email = parsedData.email || '';
        resume.contactInformation.phone = parsedData.phone || '';
        // You can add other contact information fields (address, linkedIn, etc.) similarly

        // Handle education data
        if (parsedData.education && parsedData.education.length > 0) {
          resume.education = parsedData.education.map((edu) => ({
            institution: edu.institution || '',
            degree: edu.degree || '',
            year: edu.year || '',
          }));
        }

        // Handle experience data
        if (parsedData.experience && parsedData.experience.length > 0) {
          resume.experience = parsedData.experience.map((exp) => ({
            company: exp.company || '',
            position: exp.position || '',
            duration: exp.duration || '',
          }));
        }

        // Handle skills data
        if (parsedData.skills && parsedData.skills.length > 0) {
          resume.skills = parsedData.skills.map((skill) => ({
            name: skill.name || '',
            proficiency: skill.proficiency || '',
          }));
        }
        // If your resume model has other sections, you can handle them similarly

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

const getAllResume = async (req, res) => {
  try {
    let resumeData = await Resume.find();
    console.log(resumeData,"from getAllResume controller");
    if (resumeData) {
      res.status(200).json(resumeData)
      return;
    }
    res.status(401).json({message:"Resumes not available"})
  } catch (error) {
    console.log(error.message, "from all resumedata");
    res.status(401).json({message:'Something went wrong while fetching resumeData'})
  }
}

module.exports = {
    createResume,deleteresumebyId,getresumebyId,uploadResume,getAllResume
}