const { parentPort } = require('worker_threads');
const { trackGitHubAccount } = require('./controllers/student.controllers');

// Listen for messages from the main thread
parentPort.on('message', async (message) => {
  const { username, token, studentId } = message.data;
  console.log(username, token, studentId, "studentid from githubworker");

  try {
    // Call the trackGitHubAccount function to get the data
    const githubData = await trackGitHubAccount(username, token, studentId);

    // Send the GitHub data back to the main thread
    parentPort.postMessage({ githubData });
  } catch (error) {
    console.error('Error processing GitHub data:', error.message);
    parentPort.postMessage({ error: error.message });
  }
});

