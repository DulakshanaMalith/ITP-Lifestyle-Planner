const mongoose = require('mongoose');

const CreateItinerarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Events',
    required: true,
  },
});

module.exports = mongoose.model('CreateItinerary', CreateItinerarySchema);
