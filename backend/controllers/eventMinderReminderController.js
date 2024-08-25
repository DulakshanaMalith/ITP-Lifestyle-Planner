// controllers/reminderController.js
const Reminder = require('../models/eventMinderReminderModel');

// Create a new reminder
exports.createReminder = async (req, res) => {
    try {
        const { event, date, name, email, address, wish } = req.body;

        // Validate event type
        const validEvents = ['Birthdays', 'Anniversaries', 'Memorial Dates', 'Other special events'];
        if (!validEvents.includes(event)) {
            return res.status(400).json({ error: 'Invalid event type. Valid types are: Birthdays, Anniversaries, Memorial Dates, Other special events' });
        }

        const newReminder = new Reminder({ event, date, name, email, address, wish });
        await newReminder.save();
        res.status(201).json(newReminder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all reminders
exports.getAllReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find();
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single reminder by ID
exports.getReminderById = async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id);
        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }
        res.status(200).json(reminder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a reminder by ID
exports.updateReminder = async (req, res) => {
    try {
        const { event, date, name, email, address, wish } = req.body;

        // Validate event type
        const validEvents = ['Birthdays', 'Anniversaries', 'Memorial Dates', 'Other special events'];
        if (event && !validEvents.includes(event)) {
            return res.status(400).json({ error: 'Invalid event type. Valid types are: Birthdays, Anniversaries, Memorial Dates, Other special events' });
        }

        const reminder = await Reminder.findByIdAndUpdate(
            req.params.id,
            { event, date, name, email, address, wish },
            { new: true }
        );
        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }
        res.status(200).json(reminder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a reminder by ID
exports.deleteReminder = async (req, res) => {
    try {
        const reminder = await Reminder.findByIdAndDelete(req.params.id);
        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }
        res.status(200).json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
