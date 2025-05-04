// routes/events/getEvents.js
const Event = require('../../models/Event');

module.exports = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send('Error fetching events');
  }
};
