const express = require('express');
const { exec } = require('child_process'); // To run Python script
const path = require('path'); // For handling file paths
const { verifyToken } = require('../middlewere/VerifyToken'); // Middleware

const router = express.Router();

// Route to start AI detection
router.get('/start-Workout', verifyToken, async (req, res) => {
  console.log("Accessing detection route...");

  // Resolve the Python script path dynamically
  const scriptPath = path.resolve(__dirname, '..', 'ai_model.py'); // Adjust path if needed
  console.log(`Resolved script path: ${scriptPath}`);

  try {
    // Execute the Python script
    exec(`python ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Exec error: ${error.message}`);
        return res.status(500).json({ error: "Error executing script.", details: error.message });
      }

      if (stderr) {
        console.error(`Script stderr: ${stderr}`);
        return res.status(500).json({ error: "Script error.", details: stderr });
      }

      console.log(`Script output: ${stdout}`);
      res.status(200).json({ message: "Workout detection started.", output: stdout });
    });
  } catch (err) {
    console.error(`Unexpected error: ${err.message}`);
    res.status(500).json({ error: "Unexpected error occurred.", details: err.message });
  }
});

module.exports = router;
