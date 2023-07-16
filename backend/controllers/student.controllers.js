const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student.model');
const Batch =require('../models/batch.model')
const mongoose = require('mongoose');

// Student Registration Controller
async function registerStudent(req, res) {
    const { email, password, username, batchId } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Check if the student already exists
        const existingStudent = await Student.findOne({ email }).session(session);
        if (existingStudent) {
            await session.abortTransaction();
            session.endSession();
            return res.status(409).json({ message: 'Student already exists' });
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new student
        const newStudent = new Student({
            email,
            password: hashedPassword,
            username,
            batchId
        });

        // Save the student to the database
        await newStudent.save({ session });

        // Update the batch with the new student
        await Batch.findByIdAndUpdate(batchId, { $push: { students: newStudent._id } }, { session });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: 'Registration failed', error });
    }
}




// Student Login Controller
async function loginStudent(req, res) {
    const { email, password } = req.body;

    try {
        // Check if the student exists
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ message: 'Student not found', login: false });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, student.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate a JSON Web Token (JWT)
        const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
        });

        return res.status(200).json({ message: 'Login successful', token, login: true ,student:true,student});
    } catch (error) {
        return res.status(500).json({ message: 'Login failed', error, login: false });
    }
}



// Get Student by ID
const getstudentdetailbyId =async  (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id).populate('batchId');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json({ student });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving student', error });
  }
};

// Get Student by Email
// /students/email/:email'
const getstudentbyEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const student = await Student.findOne({ email }).populate('batchId');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json({ student });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving student', error });
  }
};



// Update Student Details by ID
// /students/:id
const updateStudentdetails = async (req, res) => {
    const { id } = req.params;
    const { email, username, batchId } = req.body;

    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.email = email;
        student.username = username;
        student.batchId = batchId;

        await student.save();

        return res.status(200).json({ message: 'Student details updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating student details', error });
    }
};

// Delete Student by ID
const deleteStudent= async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await student.remove();

    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting student', error });
  }
}





module.exports = {
    registerStudent, loginStudent,
    updateStudentdetails,deleteStudent,getstudentbyEmail,getstudentdetailbyId
}