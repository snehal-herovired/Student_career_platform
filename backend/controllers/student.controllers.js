const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student.model');
const { Resume } = require('../models/resume.model')
const Batch = require('../models/batch.model')
const mongoose = require('mongoose');
const axios = require('axios');
const { resolve } = require('path');
const amqp = require('amqplib');
const { Worker } = require('worker_threads');
const authenticateJWT = require('../utils/middleware')
// require('../utils/githubWorker')

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
function getrepoDetail(username, studentId) {
  return new Promise(async (resolve, reject) => {
    try {
      const apiUrl = `https://api.github.com/users/${username}`;
      const response = await axios.get(apiUrl);
      console.log(response.data);
      if (!response) {
        reject("Error in fetching through git api")
      }

      resolve({
        studentId: studentId,
        username: response.data.login,
        total_repositories: response.data.public_repos,
        name: response.data.name || 'Not specified',
        email: response.data.email || 'Not specified',
        avatar: response.data.avatar_url || "",
        bio: response.data.bio || 'Not specified',
        public_repos: response.data.public_repos || "No repo available",
        location: response.data.location || 'Not specified',
        public_gists: response.data.public_gists || "No gists available",
        followers: response.data.followers || "No Follower Available",
        following: response.data.following || "You are Not Following Anyone Yet.",
        gitAccountCreated: formatDate(response.data.created_at) || '',
        githubLink: response.data.html_url || '',
        company: response.data.company || "No data"
      });
    } catch (error) {
      reject(error)
    }
  })
}
async function getGitHubRepositories(username, token) {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching GitHub repositories: ${error.message}`);
  }
}

// Function to fetch commit count for a specific repository
// Function to fetch commit count for a specific repository
async function getRepositoryCommitCount(owner, repoName, token) {
  try {
    console.log(owner, repoName, token, "FROM COMMITCOUNT FUNCTION");
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/commits`, {
      params: {
        per_page: 1, // Fetch only 1 most recent commit
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response, "RESPONSE FOR COMMIT COUNT");
    if (response.status !== 200) {
      console.log(`Error fetching commit count for repository ${owner}/${repoName}. Status: ${response.status}`);
      return 0;
    }

    return response.data.length; // Return the number of commits (1 in this case, as we are fetching the most recent commit)
  } catch (error) {

    console.log(`Error fetching commit count for repository ${owner}/${repoName}: ${error.message}`);
    return 0;
  }
}


// Function to fetch commit history for a specific repository (fetching only the most recent commit)
async function getRepositoryCommitHistory(owner, repoName, token) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/commits`, {
      params: {
        per_page: 1, // Fetch only 1 most recent commit
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Error fetching commit history for repository ${owner}/${repoName}. Status: ${response.status}`);
    }

    const commit = response.data[0]; // Get the most recent commit
    return [
      {
        sha: commit.sha,
        message: commit.commit.message,
        date: commit.commit.author.date,
        author: commit.commit.author.name,
        url: commit.html_url,
      },
    ];
  } catch (error) {
    // Log the error, but don't throw to continue fetching other repositories
    console.error(`Error fetching commit history for repository ${owner}/${repoName}: ${error.message}`);
    return []; // Return an empty array to indicate no commit history for the current repository
  }
}

// Function to fetch language statistics for a specific repository
async function getRepositoryLanguages(owner, repoName, token) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/languages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Error fetching language statistics for repository ${owner}/${repoName}. Status: ${response.status}`);
    }

    const languagesData = response.data;

    // Calculate the total bytes across all languages
    const totalBytes = Object.values(languagesData).reduce((total, bytes) => total + bytes, 0);

    // Calculate the percentage for each language
    const languagesPercentage = {};
    for (const language in languagesData) {
      const bytes = languagesData[language];
      const percentage = ((bytes / totalBytes) * 100).toFixed(2);
      languagesPercentage[language] = percentage;
    }

    return languagesPercentage;
  } catch (error) {
    // Log the error, but don't throw to continue fetching other repositories
    console.error(`Error fetching language statistics for repository ${owner}/${repoName}: ${error.message}`);
    return {}; // Return an empty object to indicate no language statistics for the current repository
  }
}




// Main function to track GitHub account based on username
// Main function to track GitHub account based on username
async function trackGitHubAccount(username, token, studentId) {
  try {
    // Get user data
    const userData = await getrepoDetail(username, studentId);
    console.log(userData, "from track function body");

    // Get all public repositories of the user
    const repositories = await getGitHubRepositories(username, token);

    // Create an array to store repository data
    const repositoriesData = [];
    let totalLanguagesData = {};
    let totalRepositories = repositories.length;

    // Fetch commit count and commit history for each repository
    for (const repo of repositories) {
      console.log(repo.name, "ALL REPO FOR USER");
      const commitCount = await getRepositoryCommitCount(username, repo.name, token);
      const commitHistory = await getRepositoryCommitHistory(username, repo.name, token);
      const languages = await getRepositoryLanguages(username, repo.name, token);
      // Add repository data to the array
      repositoriesData.push({
        name: repo.name,
        commitCount,
        commitHistory,
        languages,
      });
      // Accumulate language statistics for the average calculation
      for (const language in languages) {
        totalLanguagesData[language] = (totalLanguagesData[language] || 0) + parseFloat(languages[language]);
      }
    }

    // Calculate total commits for the entire GitHub account
    const totalCommits = repositoriesData.reduce((acc, val) => acc + val.commitCount, 0);
    const averageLanguagesPercentage = {};
    for (const language in totalLanguagesData) {
      const percentage = (totalLanguagesData[language] / totalRepositories).toFixed(2);
      averageLanguagesPercentage[language] = percentage;
    }

    // console.log('Repository Data:');
    // console.log(repositoriesData);

    // console.log('Average Language Percentage:');
    // console.log(averageLanguagesPercentage);
    // console.log('User Data:');
    // console.log(userData);
    // console.log('Total Commits:', totalCommits);
    // console.log('Repository Data:');
    // console.log(repositoriesData);

    return { userData, totalCommits, repositoriesData, averageLanguagesPercentage };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

//   try {
//     // Get the data from the resolved promise
//     const githubData = await githubDataPromise;

//     // Create the data object to be sent in the post request
//     const postData = {
//       gitdata: githubData,
//     };
//     // console.log("GITDATA :",postData);

//     // Make the post request to your backend API to save the GitHub data
//     const response = await axios.post(`http://localhost:5000/gitdata/post`, postData);

//     // Handle the response from the API if needed
//     console.log(response.data);

//     return 'GitHub data sent and saved successfully';
//   } catch (error) {
//     console.error('Error sending GitHub data:', error.message);
//     throw error;
//   }
// }
// async function sendGitHubData(username, token, studentId) {
//   try {
//     // Call the trackGitHubAccount function to get the data
//     const githubDataPromise = trackGitHubAccount(username, token, studentId);

//     // Get the data from the resolved promise
//     const githubData = await githubDataPromise;

//     // Connect to the RabbitMQ server
//     const connection = await amqp.connect('amqp://localhost');
//     const channel = await connection.createChannel();

//     // Assert the queue (create the queue if it doesn't exist)
//     const QUEUE_NAME = 'github_data_queue';
//     await channel.assertQueue(QUEUE_NAME);

//     // Send the data to the queue
//     channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(githubData)));

//     console.log('Data sent to the message queue for background processing');

//     // Close the RabbitMQ connection
//     channel.close();
//      connection.close();

//     // Return a response immediately to avoid impacting the user login process
//     return { message: 'GitHub data sent for background processing' };
//   } catch (error) {
//     console.error('Error sending GitHub data:', error.message);
//     return { message: 'Error sending GitHub data' };
//   }
// }

// Student Login Controller
async function loginStudent(req, res) {
  const { email, password } = req.body;
  console.log(email, password, ":email and password");
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

    // Update lastActivity timestamp
    student.lastActivity = new Date();
    await student.save();
    // Generate a JSON Web Token (JWT)
    const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '2h'
    });
    if (student && student._id) {
      // console.log("studnet ",student);
      const resume = await Resume.findOne({ studentId: student._id });
      if (!resume) {
        return res.status(200).json({ message: 'resume not found', githubUsername: false, student, admin: false, token });

      }
      // console.log("resume",resume);
      if (resume && resume.contactInformation) {
        // console.log(resume, "from here......");
        let githubdetailfromDb = resume.contactInformation.github;
        if (githubdetailfromDb !== undefined) {

          let gitusername = extractGithubUsername(githubdetailfromDb)
          gitusername = gitusername || '';
          const worker = new Worker('./githubWorker.js');
          worker.on('message', async (message) => {
            if (message.githubData) {
              // Process the GitHub data received from the worker (optional)

              // Return the login response
              // console.log(message.githubData, "gitdata");
              try {
                let postData =
                {
                  gitdata: message.githubData
                }
                const response = await axios.post(`http://localhost:5000/gitdata/post`, postData);

                //     // Handle the response from the API if needed
                console.log(response.data, "mongodb gitdata done");
                return { message: "gitdata fetched" };
              } catch (error) {
                console.log(error);
                return;
              }
            } else if (message.error) {
              // Handle the error if any

              // Return the error response
              return { message: 'gitdata could not be fetched' }
            }
          });
          console.log(student._id, "from line 373");
          worker.postMessage({ data: { username: gitusername, token: process.env.gitToken, studentId: `${student._id}` } });
        }



        return res.status(200).json({ message: 'Login successful', token, login: true, admin: false, student });



      }
    }

    return res.status(200).json({ message: 'Login successful', token, login: true, admin: false, student });
  } catch (error) {
    console.log(error, "error from Login");
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

    return res.status(200).json({ studentData: student });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error retrieving student', error });
  }
};

const getStudentandGitDetailbyId = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const student = await Student.findById(id).populate('batchId');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    // console.log(student);
    if (student && student._id) {
      console.log("studnet ", student);
      const resume = await Resume.findOne({ studentId: student._id });
      console.log(resume, "resume from rhis student");
      if (!resume) {
        return res.status(404).json({ message: 'resume not found', githubUsername: false, });

      }
      // console.log("resume",resume);
      if (resume && resume.contactInformation) {
        // console.log(resume, "from here......");
        let githubdetailfromDb = resume.contactInformation.github;
        const gitusername = extractGithubUsername(githubdetailfromDb)

        const worker = new Worker('./githubWorker.js');
        worker.on('message', async (message) => {
          if (message.githubData) {
            // Process the GitHub data received from the worker (optional)

            // Return the login response
            // console.log(message.githubData, "gitdata");
            try {
              let postData =
              {
                gitdata: message.githubData
              }
              const response = await axios.post(`http://localhost:5000/gitdata/post`, postData);

              //     // Handle the response from the API if needed
              console.log(response.data, "mongodb gitdata done");
              return { message: "gitdata fetched" };
            } catch (error) {
              console.log(error);
              return;
            }
          } else if (message.error) {
            // Handle the error if any

            // Return the error response
            return { message: 'gitdata could not be fetched' }
          }
        });
        console.log(student._id, "from line 373");
        worker.postMessage({ data: { username: gitusername, token: process.env.gitToken, studentId: `${student._id}` } });



      }
    }
    return res.status(200).json({ studentData: student, message: "github data fetching" });

  } catch (error) {
    console.log(error);
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
    const student = await Student.findByIdAndRemove(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Error deleting student', error });
  }
}


async function recentActivity(req, res) {
  try {
    // Define the threshold for considering students as active (e.g., last 24 hours)
    const threshold = new Date();
    threshold.setHours(threshold.getHours() - 24);

    // Find students whose last activity is within the threshold
    const activeStudents = await Student.find({ lastActivity: { $gte: threshold } });

    res.json(activeStudents);
  } catch (error) {
    console.error('Error fetching active students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  registerStudent, loginStudent, recentActivity,
  updateStudentdetails, deleteStudent, getstudentbyEmail, getstudentdetailbyId, getAllStudent, getStudentandGitDetailbyId, trackGitHubAccount
}