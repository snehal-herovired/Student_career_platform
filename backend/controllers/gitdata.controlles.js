const GitDataModel = require("../models/github.model");

const insertgitData = async (req, res) => {
  try {
    const githubData = req.body.gitdata;
    const studentId = githubData.userData.studentId; // Assuming the username is present in the userData

    // Find existing user data in the database based on username
    let existingUser = await GitDataModel.findOne({ "userData.studentId": studentId });

    if (!existingUser) {
      // If user data does not exist, create a new document
      existingUser = new GitDataModel(githubData);
    } else {
      // If user data exists, update the fields
      existingUser.repositoriesData = githubData.repositoriesData;
      existingUser.totalCommits = githubData.totalCommits;
      existingUser.averageLanguagesPercentage = githubData.averageLanguagesPercentage;
    }

    // Save the user data document
    await existingUser.save();
    return res.status(200).json(existingUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};




const getGitDataByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const gitData = await GitDataModel.findOne({ "userData.studentId": studentId });

    if (!gitData) {
      return res.status(404).json({ message: 'Git data not found for the specified student ID' });
    }

    return res.status(200).json(gitData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};



module.exports = { insertgitData ,getGitDataByStudentId};
