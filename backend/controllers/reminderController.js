const Reminder = require('../models/reminderModel');

exports.createReminder = async (req, res) => {
    try {
        const reminder = new Reminder(req.body);
        await reminder.save();
        res.status(201).json(reminder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find().populate('vehicleName');
        res.status(200).json(reminders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateReminder = async (req, res) => {
    try {
        const reminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(reminder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteReminder = async (req, res) => {
    try {
        await Reminder.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
