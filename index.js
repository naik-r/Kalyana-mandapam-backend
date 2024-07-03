const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bookingRoutes = require('./BookingRoutes');
const hallRoutes = require('./hallRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', bookingRoutes);
app.use('/api', hallRoutes);

app.post('/api/send-email', (req, res) => { // Updated route
  const { name, phoneNumber, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email, // Use the email entered by the user
    to: 'ramavath12580@gmail.com', // Email address where you want to receive messages
    subject: 'FunctionHall-Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent');
    }
  });
});

const DATABASE = process.env.DATABASE;
const uri = `${DATABASE}functionhall`; // Assuming DATABASE contains the MongoDB URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
