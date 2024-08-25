// routes/reminderRoutes.js
const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/eventMinderReminderController');

// Route to create a new reminder
router.post('/reminders', reminderController.createReminder);

// Route to get all reminders
router.get('/getreminders', reminderController.getAllReminders);

// Route to get a specific reminder by ID
router.get('/reminders/:id', reminderController.getReminderById);

// Route to update a reminder by ID
router.put('/reminders/:id', reminderController.updateReminder);

// Route to delete a reminder by ID
router.delete('/reminders/:id', reminderController.deleteReminder);

module.exports = router;
