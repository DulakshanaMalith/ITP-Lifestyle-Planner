const Goal = require('../models/goalModel');
const Income = require('../models/incomeModel'); 
const schedule = require('node-schedule');
const axios = require('axios');
require('dotenv').config();

const sendlkApiToken = process.env.SENDLK_API_TOKEN;
const sendlkApiUrl = 'https://sms.send.lk/api/v3/sms/send';  // Updated API endpoint

// Utility function to validate phone numbers
const validatePhoneNumber = (phone) => {
  return phone && phone.length >= 10;
};

// Set a new goal for the user
const setGoal = async (req, res) => {
  const { amount, targetDate, phone } = req.body;
  try {
    // Validate request data
    if (!amount || !targetDate || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validatePhoneNumber(phone)) {
      return res.status(400).json({ message: 'Phone number must be at least 10 digits long.' });
    }

    // Create and save the goal
    const goal = new Goal({ user: req.user.id, amount, targetDate, phone });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update goal completion status by checking the user's income
const updateGoalCompletionStatus = async () => {
  console.log('Starting goal completion status update...');
  try {
    const today = new Date().toISOString().split('T')[0];  // Get today's date
    const goals = await Goal.find({ targetDate: today });   // Find goals that are due today

    if (goals.length === 0) {
      console.log('No goals found to update.');
      return;
    }

    for (const goal of goals) {
      console.log(`Processing goal ${goal._id} for user ${goal.user}...`);

      // Aggregate total income for the user up to the goal's target date
      const totalIncome = await Income.aggregate([
        { $match: { user: goal.user, date: { $lte: new Date(goal.targetDate) } } },
        { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
      ]);

      const hasMetGoal = totalIncome.length > 0 && (totalIncome[0]?.totalAmount || 0) >= goal.amount;
      console.log(`Total Income for goal ${goal._id}: ${totalIncome[0]?.totalAmount || 0}`);
      console.log(`Has met goal: ${hasMetGoal} for goal ${goal._id}`);

      // Update goal status
      await Goal.findByIdAndUpdate(goal._id, { completed: hasMetGoal });

      // Prepare SMS message
      const messageBody = hasMetGoal
        ? `Congratulations! Your goal of ${goal.amount} has been completed.`
        : `Unfortunately, your goal of ${goal.amount} was not completed. Keep working towards it!`;

      // Send SMS notification
      await sendSmsNotification(goal.phone, messageBody);
    }
    console.log('Goal completion status update finished.');
  } catch (error) {
    console.error('Error during goal completion status update:', error);
  }
};

// Function to send SMS notifications
const sendSmsNotification = async (phone, messageBody) => {
  if (!sendlkApiToken) {
    console.error('SENDLK_API_TOKEN is missing');
    return;
  }

  const data = {
    to: phone,
    message: messageBody,
    sender_id: 'SMSAPI',  // Customize sender ID as needed
  };

  try {
    const response = await axios.post(sendlkApiUrl, data, {
      headers: {
        Authorization: `Bearer ${sendlkApiToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`Notification sent to ${phone}:`, response.data);
  } catch (error) {
    console.error(`Failed to send notification to ${phone}:`, error.response?.data || error.message);
  }
};

// Schedule goal checks to run daily at a specific time (e.g., 15:30)
const scheduleGoalCheck = () => {
  schedule.scheduleJob('30 15 * * *', () => {
    console.log('Running scheduled goal check...');
    updateGoalCompletionStatus();
  });
};

// Initialize scheduled task
scheduleGoalCheck();


const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.json(goals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateGoal = async (req, res) => {
  const { id } = req.params;
  const { amount, targetDate, phone } = req.body;
  try {
    const goal = await Goal.findByIdAndUpdate(id, { amount, targetDate, phone }, { new: true });
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteGoal = async (req, res) => {
  const { id } = req.params;
  try {
    const goal = await Goal.findByIdAndDelete(id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  setGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  updateGoalCompletionStatus,
};
