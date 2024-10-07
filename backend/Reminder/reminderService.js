const cron = require('node-cron');
const {autoAssistReminderEmail} = require("./mailer");


const Reminder = require('../models/reminderModel');


const checkUpcomingReminderAutoAssist = async (email, date) => {
  // Validate the input date
  const inputDate = new Date(date);
  if (isNaN(inputDate.getTime())) {
      throw new Error("Invalid date provided.");
  }

  // Set the start and end of the specified day
  const startOfDay = new Date(inputDate);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(inputDate);
  endOfDay.setHours(23, 59, 59, 999);

  try {
      const reminders = await Reminder.find({
          email, // Use the provided email to filter reminders
          date: {
              $gte: startOfDay,
              $lte: endOfDay,
          },
      });

      // Loop through reminders and send emails
      for (const reminder of reminders) {
          await autoAssistReminderEmail(email, {
              vehicleName: reminder.vehicleName,
              reminderType: reminder.reminderType,
              date: reminder.date.toString(),
              appointedTime: reminder.appointedTime,
              location: reminder.location,
              notes: reminder.notes || "No notes provided",
          });
      }
  } catch (error) {
      console.error("Failed to send Auto Assist reminders:", error.message);
  }
};
   


   


cron.schedule('37 16 * * *', () => {
  console.log("Checking for reminders...");
  checkUpcomingReminderAutoAssist ();
});

module.exports = {
  checkUpcomingReminderAutoAssist,
};
