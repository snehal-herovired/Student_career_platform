const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Batch = require('../models/batch.model');
const User=require('../models/user.model')

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
  const { userid } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const batch = await Batch.findById(id).session(session);
    if (!batch) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Batch not found' });
    }

    const student = await User.findById(userid).session(session);
    if (!student) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Student not found' });
    }

    batch.students.push(userid);
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
  const { id, userid } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const batch = await Batch.findById(id).session(session);
    if (!batch) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Batch not found' });
    }

    const studentIndex = batch.students.indexOf(userid);
    if (studentIndex === -1) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Student not found in batch' });
    }

    batch.users.splice(studentIndex, 1);
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





module.exports = {
  getBatchdetailbyid, addStudenttoBatch, deleteStudentfromBatch, createBatch, getAllbatches
}
