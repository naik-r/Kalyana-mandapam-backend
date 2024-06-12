const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hallRoutes = require('./hallRoutes');
const onlyHallRoutes = require('./OnlyHallRoutes.js');
require('dotenv').config();  // Ensure this is at the top
const DATABASE=process.env.DATABASE

const app = express();

const uri = 'mongodb://localhost:27017';
const dbName = 'functionhall';

mongoose.connect(`${DATABASE}${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.use(cors());
app.use(bodyParser.json());

app.use('/api/halls', hallRoutes);
app.use('/api/onlyhall', onlyHallRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});