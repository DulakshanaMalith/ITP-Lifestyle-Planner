const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workSchema = new Schema({
    description: {
        type: String,
        required: [true, 'Work description is required.'],
        minlength: [5, 'Description must be at least 5 characters long.'],
        maxlength: [200, 'Description cannot exceed 200 characters.']
    },
    startTime: {
        type: Date,
        required: [true, 'Start time is required.']
    },
    endTime: {
        type: Date,
        required: [true, 'End time is required.'],
        validate: {
            validator: function(value) {
                return value > this.startTime;
            },
            message: 'End time must be after start time.'
        }
    }
});

const scheduleSchema = new Schema({
    date: {
        type: Date,
        required: [true, 'Date is required.'],
        validate: {
            validator: function(value) {
                return value >= new Date(); // Use new Date() for accurate comparison
            },
            message: 'Date cannot be in the past.'
        }
    },
    works: [workSchema]
}, { timestamps: true });

module.exports = mongoose.model('MeetSchedule', scheduleSchema);