const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    reminderType: { type: String, required: true },
    description: { type: String, required: true },
    days: { type: Number, required: true },
    hours: { type: Number, required: true },
    minutes: { type: Number, required: true },
    seconds: { type: Number, required: true },
});

module.exports = mongoose.model('HealthMatereminder', reminderSchema);
