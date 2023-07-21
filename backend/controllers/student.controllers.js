const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student.model');
const {Resume} = require('../models/resume.model')
const Batch = require('../models/batch.model')
const mongoose = require('mongoose');
const axios = require('axios')

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

    return res.status(200).json({ message: 'Login successful', token, login: true, student: true, student });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error, login: false });
  }
}



// Get Student by ID
const getstudentdetailbyId = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id).populate('batchId');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving student', error });
  }
};

const getStudentandGitDetailbyId = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  function extractGithubUsername(githubUrl) {
    const githubUrlPattern = /^(https?:\/\/)?(www\.)?github.com\//i;
    const username = githubUrl.replace(githubUrlPattern, '');
    return username.split('/')[0];
  }

  function formatDate(gitAccountCreated) {
    const date = new Date(gitAccountCreated);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
   function getrepoDetail(username) {
     return new Promise(async(resolve, reject) => {
      try {
        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
       console.log(response.data);
       if (!response) {
         reject("Error in fetching through git api")
       }
        const userData = {
          username: response.data.login,
          total_repositories: response.data.public_repos,
          name: response.data.name || 'Not specified',
          email: response.data.email || 'Not specified',
          avatar:response.data.avatar_url || "",
          bio: response.data.bio || 'Not specified',
          public_repos: response.data.public_repos || "No repo available",
          location: response.data.location || 'Not specified',
          public_gists: response.data.public_gists || "No gists available",
          followers: response.data.followers || "No Follower Available",
          following: response.data.following || "You are Not Following Anyone Yet.",
          gitAccountCreated: formatDate(response.data.created_at) || '',
          githubLink: response.data.html_url || '',
          company:response.data.company || "No data"
      };
       resolve(userData);
      } catch (error) {
        reject(error)
      }
   })
  } 

  
  
  try {
    const student = await Student.findById(id).populate('batchId');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    // console.log(student);
    if (student && student._id) {
      console.log("studnet ",student);
      const resume = await Resume.findOne({ studentId: student._id });
      if (!resume) {
        return res.status(404).json({ message: 'resume not found', githubUsername: false });
      
      }
      // console.log("resume",resume);
      if (resume && resume.contactInformation) {
        // console.log(resume, "from here......");
        let githubdetailfromDb = resume.contactInformation.github;
        const gitusername = extractGithubUsername(githubdetailfromDb)
        
        
          
          const userData = await getrepoDetail(gitusername);
         return res.status(200).json({gitdata :userData,studentData:student});
       
        
  
      }
    }
   
  } catch (error) {
    return res.status(403).json({ message: "error in fetching data from github" })
  }
}

const getAllStudent = async (req, res) => {
  try {
    const StudentData = await Student.find().populate('batchId');
    if (!StudentData) {
      return res.status(401).send('No Data')
    }
    return res.status(200).json(StudentData);
  } catch (error) {
    return res.status(500).send(error)
  }
}

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
const deleteStudent = async (req, res) => {
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
  updateStudentdetails, deleteStudent, getstudentbyEmail, getstudentdetailbyId, getAllStudent, getStudentandGitDetailbyId
}