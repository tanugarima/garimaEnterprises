const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');

dotenv.config();
const app = express();
const upload = multer(); // Handle FormData without file uploads

// CORS configuration for production only
app.use(cors({
  origin: 'https://www.garimaenterprises.net',
  methods: ['POST'],
  credentials: true
}));

// Middleware to parse FormData and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload.none());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) console.error('Nodemailer verification error:', error);
  else console.log('Nodemailer ready:', success);
});

// Contact form endpoint
app.post('/submit-contact', (req, res) => {
  console.log('Contact form submission:', req.body); // Debug log
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    console.error('Missing required fields:', { name, email, message });
    return res.status(400).json({ error: 'All fields are required' });
  }
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).json({ error: 'Error sending email' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ success: true });
  });
});

// Order form endpoint
app.post('/submit-order', (req, res) => {
  console.log('Order form submission:', req.body); // Debug log
  const { name, email, phone, item, quantity, callBackTime, message } = req.body;
  if (!name || !email || !phone || !item || !quantity || !callBackTime) {
    console.error('Missing required fields:', { name, email, phone, item, quantity, callBackTime });
    return res.status(400).json({ error: 'All fields are required' });
  }
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Order from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nItem: ${item}\nQuantity: ${quantity}\nPreferred Call-Back Time: ${callBackTime}\nAdditional Details: ${message || 'None'}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).json({ error: 'Error sending email' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ success: true });
  });
});

// Review form endpoint
app.post('/submit-review', (req, res) => {
  console.log('Review form submission:', req.body); // Debug log
  const { name, email, rating, message } = req.body;
  if (!name || !email || !rating || !message) {
    console.error('Missing required fields:', { name, email, rating, message });
    return res.status(400).json({ error: 'All fields are required' });
  }
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Review from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nRating: ${rating}\nReview: ${message}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).json({ error: 'Error sending email' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ success: true });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));