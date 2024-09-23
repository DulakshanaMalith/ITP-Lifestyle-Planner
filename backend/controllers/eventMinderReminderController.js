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

// Get all reminders or filter by date
exports.getAllReminders = async (req, res) => {
    try {
        const { date } = req.query;
        let query = {};
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);

            query = { date: { $gte: startDate, $lt: endDate } };
        }

        const reminders = await Reminder.find(query);
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

// Get reminders by specific date for birthdays
exports.getRemindersByDateBirthday = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: 'Date query parameter is required' });
        }

        const startDate = new Date(date + 'T00:00:00Z'); // Start of the day in UTC
        const endDate = new Date(date + 'T23:59:59Z');   // End of the day in UTC

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const reminders = await Reminder.find({
            date: { $gte: startDate, $lte: endDate },
            event: 'Birthdays'
        });

        res.status(200).json(reminders);
    } catch (error) {
        console.error("Error fetching reminders by date:", error);
        res.status(500).json({ error: 'An error occurred while fetching reminders' });
    }
};

// Get reminders by specific date for anniversaries
exports.getRemindersByDateAnniversaries = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: 'Date query parameter is required' });
        }

        const startDate = new Date(date + 'T00:00:00Z'); // Start of the day in UTC
        const endDate = new Date(date + 'T23:59:59Z');   // End of the day in UTC

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const reminders = await Reminder.find({
            date: { $gte: startDate, $lte: endDate },
            event: 'Anniversaries'
        });

        res.status(200).json(reminders);
    } catch (error) {
        console.error("Error fetching reminders by date:", error);
        res.status(500).json({ error: 'An error occurred while fetching reminders' });
    }
};

// Controllers/ReminderController.js

// Existing imports and functions...

// Get reminders by specific date for memorial days
exports.getRemindersByDateMemorialDays = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: 'Date query parameter is required' });
        }

        const startDate = new Date(date + 'T00:00:00Z'); // Start of the day in UTC
        const endDate = new Date(date + 'T23:59:59Z');   // End of the day in UTC

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const reminders = await Reminder.find({
            date: { $gte: startDate, $lte: endDate },
            event: 'Memorial Dates'
        });

        res.status(200).json(reminders);
    } catch (error) {
        console.error("Error fetching reminders by date:", error);
        res.status(500).json({ error: 'An error occurred while fetching reminders' });
    }
};

// Get reminders by specific date for Other Special Days
exports.getRemindersByDateOtherSpecialDays = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: 'Date query parameter is required' });
        }

        const startDate = new Date(date + 'T00:00:00Z'); // Start of the day in UTC
        const endDate = new Date(date + 'T23:59:59Z');   // End of the day in UTC

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const reminders = await Reminder.find({
            date: { $gte: startDate, $lte: endDate },
            event: 'Other special events'
        });

        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching reminders' });
    }
};


