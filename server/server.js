const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/submit-contact', (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: email,
    to: 'garimaenterprises75@gmail.com',
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('http://localhost:8000/thank-you.html?type=contact');
    }
  });
});

app.post('/submit-order', (req, res) => {
  const { name, email, phone, product, quantity, message } = req.body;
  const mailOptions = {
    from: email,
    to: 'garimaenterprises75@gmail.com',
    subject: `Order from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProduct: ${product}\nQuantity: ${quantity}\nAdditional Details: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('http://localhost:8000/thank-you.html?type=order');
    }
  });
});

app.post('/submit-review', (req, res) => {
  const { name, email, rating, message } = req.body;
  const mailOptions = {
    from: email,
    to: 'garimaenterprises75@gmail.com',
    subject: `Review from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nRating: ${rating}\nReview: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('http://localhost:8000/thank-you.html?type=review');
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});