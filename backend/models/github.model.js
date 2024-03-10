const mongoose = require('mongoose');

const commitHistorySchema = new mongoose.Schema({
  sha: { type: String, },
  message: { type: String  },
  date: { type: Date },
  author: { type: String},
  url: { type: String},
});

const repositorySchema = new mongoose.Schema({
  name: { type: String,  },
  commitCount: { type: Number, },
  commitHistory: [commitHistorySchema],
});

const gitDataSchema = new mongoose.Schema({
    userData: {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required:true
      },
    username: { type: String},
    total_repositories: { type: Number },
    name: { type: String},
    email: { type: String },
    avatar: { type: String },
    bio: { type: String },
    public_repos: { type: String },
    location: { type: String },
    public_gists: { type: String },
    followers: { type: String },
    following: { type: String },
    gitAccountCreated: { type: String },
    githubLink: { type: String },
    company: { type: String },
    totalCommits: { type: Number },
  },
  totalCommits: { type: Number, },
  repositoriesData: [repositorySchema],
  averageLanguagesPercentage: { type: mongoose.Schema.Types.Mixed }, // Dynamic field
});

const GitDataModel = mongoose.model('GitData', gitDataSchema);

module.exports = GitDataModel;


