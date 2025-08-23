
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const axios = require('axios');
require('dotenv').config();
const cors = require('cors')({ origin: true });

// Send PDF report as email attachment
exports.sendCareerReport = functions.https.onRequest(async (req, res) => {
  // Universal Firebase Hosting CORS (web.app, firebaseapp.com, localhost, custom domains)
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }
    const { email, pdfBase64, filename, name } = req.body;
    if (!email || !pdfBase64) {
      return res.status(400).send('Missing email or PDF data');
    }
    const gmailEmail = functions.config().gmail.email;
    const gmailPassword = functions.config().gmail.password;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailEmail,
        pass: gmailPassword,
      },
    });
    try {
      const mailOptions = {
        from: `Ultimate Career AI <${gmailEmail}>`,
        to: email,
        subject: `Your Ultimate Career AI Assessment Report${name ? ' for ' + name : ''}`,
        text: `Dear${name ? ' ' + name : ''},\n\nThank you for completing your Ultimate Career AI assessment!\n\nAttached is your personalized, detailed career assessment report.\n\nWe wish you the best in your career journey!\n\nBest regards,\nUltimate Career AI Team`,
        html: `<div style='font-family:sans-serif;font-size:16px;color:#222;'>
          <p>Dear${name ? ' <b>' + name + '</b>' : ''},</p>
          <p>Thank you for completing your <b>Ultimate Career AI</b> assessment!</p>
          <p>Attached is your personalized, detailed career assessment report as a PDF.</p>
          <p style='margin-top:24px;'>We wish you the best in your career journey!</p>
          <p style='color:#6366f1;font-weight:bold;'>Ultimate Career AI Team</p>
        </div>`,
        attachments: [
          {
            filename: filename || 'career-report.pdf',
            content: Buffer.from(pdfBase64, 'base64'),
            contentType: 'application/pdf',
          },
        ],
      };
      await transporter.sendMail(mailOptions);
      return res.status(200).send('Email sent!');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Failed to send email');
    }
  });
});

// Email sending endpoint
exports.sendEmail = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }
  const { to, subject, text, html } = req.body;
  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, text or html' });
  }
  // Use Firebase config for Gmail credentials
  const gmailEmail = functions.config().gmail.email;
  const gmailPassword = functions.config().gmail.password;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });
  try {
    const info = await transporter.sendMail({
      from: `Ultimate Career AI <${gmailEmail}>`,
      to,
      subject,
      text,
      html
    });
    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
});

exports.geminiProxy = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }
  try {
    console.log('Gemini Proxy Request:', JSON.stringify(req.body));
    const apiKey = process.env.GEMINI_API_KEY || functions.config().gemini.key;
    const url = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=' + apiKey;
    const prompt = req.body && req.body.prompt;
    if (!prompt) {
      console.error('Missing prompt in request body:', req.body);
      return res.status(400).json({ error: 'Missing prompt in request body.' });
    }
    const geminiPayload = {
      contents: [
        { parts: [{ text: prompt }] }
      ]
    };
    const response = await axios.post(url, geminiPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      }
    });
    // Extract the text from the Gemini response
    const geminiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    let cleanJson = null;
    if (geminiText) {
      // Remove markdown code block if present
      const match = geminiText.match(/```json\s*([\s\S]*?)\s*```/i);
      const jsonString = match ? match[1] : geminiText;
      try {
        cleanJson = JSON.parse(jsonString);
      } catch (e) {
        console.error('Failed to parse Gemini JSON:', e, jsonString);
        return res.status(500).json({ error: 'Failed to parse Gemini JSON', details: e.message });
      }
      return res.json(cleanJson);
    }
    // Fallback: return the raw Gemini response
    res.json(response.data);
  } catch (err) {
    console.error('Gemini Proxy Error:', err.message, err.response?.data, err.stack);
    res.status(500).json({ error: err.message, details: err.response?.data, stack: err.stack });
  }
});
