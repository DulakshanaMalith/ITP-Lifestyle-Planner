const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  totalGuests: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
  },
});

const Event = mongoose.model("Events", eventSchema);

module.exports = Event;
