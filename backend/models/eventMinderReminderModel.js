const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameValidationRegex = /^[A-Za-z\s]+$/;

const ReminderSchema = new Schema({
    event: {
        type: String,
        enum: ['Birthdays', 'Anniversaries', 'Memorial Dates', 'Other special events'], // Allowed values
        required: [true, 'Event type is required.'] // Custom error message
    },
    date: {
        type: Date,
        required: [true, 'Date is required.'],
        validate: {
            validator: function(value) {
                return value >= new Date(); // Ensures the date is not in the past
            },
            message: 'Date cannot be in the past.'
        }
    },
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minlength: [3, 'Name must be at least 3 characters long.'],
        maxlength: [50, 'Name cannot exceed 50 characters.'],
        validate: {
            validator: function(value) {
                return nameValidationRegex.test(value);
            },
            message: 'Name can only contain letters and spaces.'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    address: {
        type: String,
        required: [true, 'Address is required.'],
        minlength: [10, 'Address must be at least 10 characters long.'],
        maxlength: [100, 'Address cannot exceed 100 characters.']
    },
    wish: {
        type: String,
        required: [true, 'Wish is required.'],
        minlength: [5, 'Wish must be at least 5 characters long.'],
        maxlength: [200, 'Wish cannot exceed 200 characters.']
    }
}, { timestamps: true });

module.exports = mongoose.model('eventMinderReminderModel', ReminderSchema);
