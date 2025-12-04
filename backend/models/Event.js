const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  ticket_price: Number,
  available_tickets: Number
});

module.exports = mongoose.model('Event', EventSchema);