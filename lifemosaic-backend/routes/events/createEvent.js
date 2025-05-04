// routes/events/createEvent.js
const Event = require('../../models/Event');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  const { title, category, date, description } = req.body;
  const { token } = req.headers;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const newEvent = new Event({ title, category, date, description, user: userId });
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).send('Error creating event');
  }
};
