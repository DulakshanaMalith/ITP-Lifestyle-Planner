const nodemailer = require('nodemailer');

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // email service
  auth: {
    user: 'lifestyleplanner6@gmail.com', 
    pass: 'oepz jswu zpgx kxeq', 
  },
});




const autoAssistReminderEmail = async (email, reminderDetails) => {
  const { vehicleName, reminderType, date, appointedTime, location, notes } = reminderDetails;

  const reminderMessage = `Reminder: You have an upcoming ${reminderType} for your vehicle "${vehicleName}" scheduled on ${date} at ${appointedTime} at ${location}.
Notes: ${notes || "No notes provided."}`;

  const mailOptions = {
    from: 'lifestyleplanner6@gmail.com',
    to: email,
    subject: `Reminder: ${reminderType} for "${vehicleName}" Scheduled`,
    text: reminderMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {  autoAssistReminderEmail};
