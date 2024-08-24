const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: String,
    date: String,
    time: String,
    itineraryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary',required: true },

});

module.exports = mongoose.model('Activity', activitySchema);
