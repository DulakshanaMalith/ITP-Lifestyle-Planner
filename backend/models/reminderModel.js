const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    vehicleName: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    reminderType: { type: String, enum: ['Service Reminder', 'License Renewal'], required: true },
    date: { type: Date, required: true },
    appointedTime: { type: String, required: true },
    location: { type: String, required: true },
    cost: { type: Number, required: true },
    notes: { type: String },
});

module.exports = mongoose.model('Reminder', reminderSchema);
