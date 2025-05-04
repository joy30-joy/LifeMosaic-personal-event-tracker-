// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

// Models
const User = require('./models/User');
const Event = require('./models/Event');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// API Routes
app.post('/register', require('./routes/auth/register'));
app.post('/login', require('./routes/auth/login'));
app.get('/events', require('./routes/events/getEvents'));
app.post('/events', require('./routes/events/createEvent'));

// Start the server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
