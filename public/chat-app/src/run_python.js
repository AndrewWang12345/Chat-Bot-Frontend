const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
const port = 3001;

// Enable CORS to allow requests from the frontend
app.use(cors());

// Define a route to execute the Python script
app.get('/run-python', (req, res) => {
  exec('python generate.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send(`Error executing script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    res.send(stdout);
  });
});

// Define a root route for testing purposes
app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
