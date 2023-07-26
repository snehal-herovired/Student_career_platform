const amqp = require('amqplib');
const axios = require('axios');

const QUEUE_NAME = 'github_data_queue';
const SERVER_URL = 'http://localhost:5000/gitdata/post'; // Replace with your server URL

async function sendDataToServer(githubData) {
  try {
    const response = await axios.post(SERVER_URL, { gitdata: githubData });
    console.log('Data sent to server:', response.data);
  } catch (error) {
    console.error('Error sending data to server:', error.message);
  }
}

async function processGitHubData(githubData) {
  // Process the data here if needed
  console.log('Processing GitHub data:', githubData);

  // Send the data to the server
  await sendDataToServer(githubData);
}

async function startWorker() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME);

  console.log('Worker is listening for messages...');

  channel.consume(QUEUE_NAME, async (message) => {
    const githubData = JSON.parse(message.content.toString());
    await processGitHubData(githubData);

    // Acknowledge the message to remove it from the queue
    channel.ack(message);
  });
}

startWorker().catch((error) => {
  console.error('Worker error:', error);
});
