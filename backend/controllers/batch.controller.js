const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Batch = require('../models/batch.model');
const Student = require('../models/Student.model');
const authenticateJWT =require('../utils/middleware');
const { Resume } = require('../models/resume.model');
// Get Batch by ID
// '/batches/:id
const getBatchdetailbyid = async (req, res) => {
  const { id } = req.params;

  try {
    const batch = await Batch.findById(id).populate('students');
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    return res.status(200).json({batch} );
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving batch', error });
  }
}

const getAllbatches = async (req, res) => {
  try {
    const allBatches = await Batch.find();
    if (!allBatches) {
      return res.status(404).json({ message: 'No batches available' });
    }
    return res.status(200).json(allBatches );
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving batch', error });
  }
}

// Update Batch Details by ID
const updateBatch = async (req, res) => {
  const { id } = req.params;
  const { name, studentIds } = req.body;

  try {
    const batch = await Batch.findById(id);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    batch.name = name;

    if (studentIds && studentIds.length > 0) {
      const students = await Student.find({ _id: { $in: studentIds } });
      if (students.length !== studentIds.length) {
        return res.status(404).json({ message: 'One or more students not found' });
      }
      batch.students = students.map(student => student._id);
    } else {
      batch.students = [];
    }

    await batch.save();

    return res.status(200).json({ message: 'Batch details updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating batch details', error });
  }
}

// Delete Batch by ID
const deleteBatch = async (req, res) => {
  const { id } = req.params;

  try {
    const batch = await Batch.findById(id);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    await batch.remove();

    return res.status(200).json({ message: 'Batch deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting batch', error });
  }
}




// Create Batch
// /batches
const createBatch = async (req, res) => {
  const { name } = req.body;

  try {
    const newBatch = new Batch({ name });
    await newBatch.save();

    return res.status(201).json({ message: 'Batch created successfully', batch: newBatch });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating batch', error });
  }
};





// Add Student to Batch
// /batches/:id/students
const addStudenttoBatch = async (req, res) => {
  const { id } = req.params;
  const { studentId } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const batch = await Batch.findById(id).session(session);
    if (!batch) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Batch not found' });
    }

    const student = await Student.findById(studentId).session(session);
    if (!student) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Student not found' });
    }

    batch.students.push(studentId);
    await batch.save();

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: 'Student added to batch successfully', batch });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: 'Error adding student to batch', error });
  }
};

// Remove Student from Batch
// /batches/:id/students/:studentId
const deleteStudentfromBatch = async (req, res) => {
  const { id, studentId } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const batch = await Batch.findById(id).session(session);
    if (!batch) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Batch not found' });
    }

    const studentIndex = batch.students.indexOf(studentId);
    if (studentIndex === -1) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Student not found in batch' });
    }

    batch.students.splice(studentIndex, 1);
    await batch.save();

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: 'Student removed from batch successfully', batch });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: 'Error removing student from batch', error });
  }
}

// programController.js



const getProgramData = async (req, res) => {
  try {
    // Fetch all batches/courses in the program
    const batches = await Batch.find();

    // Initialize an array to store course details
    const programData = [];
    // Initialize a Set to store unique course names
    const uniqueCourses = new Set();

    // Iterate through each batch/course
    for (const batch of batches) {
      
      const batchData = {
        courseId: batch._id,
        courseName: batch.name,
        courseType:batch.course,
        totalStudentsViredStore: batch.students.length,
        totalEnrolledStudent:batch.totalEnrolledStudent,
        totalProjects: await Resume.countDocuments({ batchId: batch._id }),
      };

      // Add batchData to programData array
      programData.push(batchData);
    }

   

    res.json({
      
      programData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getUniqueCourses = async (req, res) => {
  try {
    // Fetch all batches/courses in the program
    const batches = await Batch.find();

    // Initialize a Set to store unique course names
    const uniqueCourses = new Set();

    // Iterate through each batch/course
    for (const batch of batches) {
      uniqueCourses.add(batch.course); // Assuming 'name' is the field representing the course name
    }

    const totalUniqueCourses = uniqueCourses.size;

    res.json({
      Programs: Array.from(uniqueCourses), // Convert Set to an array
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getUniqueCourses,getProgramData, getBatchdetailbyid, updateBatch, deleteBatch, addStudenttoBatch, deleteStudentfromBatch, createBatch, getAllbatches
}
