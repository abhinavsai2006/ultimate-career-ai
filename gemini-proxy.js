// Simple Node.js Gemini proxy server
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from current directory
const path = require('path');
app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    // Using the stable v1 API endpoint
    const url = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=' + apiKey;
    
    const geminiPayload = {
      contents: [
        { parts: [{ text: req.body.prompt }] }
      ]
    };
    
    const response = await axios.post(url, geminiPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      }
    });
    
    res.json(response.data);
  } catch (err) {
    console.error('Gemini API Error:', err.message);
    res.status(500).json({ 
      error: err.message, 
      details: err.response?.data 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Gemini proxy server running on http://localhost:${PORT}`);
});
