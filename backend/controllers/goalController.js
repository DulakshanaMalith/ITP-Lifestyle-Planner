const Goal = require('../models/goalModel');
const Income = require('../models/incomeModel'); 

const updateGoalCompletionStatus = async () => {
  console.log('Starting goal completion status update...');
  
  try {
    // Fetch all goals with a target date that is today or earlier
    const goals = await Goal.find({
      targetDate: { $lte: new Date() }  // Only goals with target date up to today
    });
    
    if (goals.length === 0) {
      console.log('No goals found to update.');
      return;
    }

    // Loop through each goal and check if it has met the completion criteria
    for (const goal of goals) {
      console.log(`Processing goal ${goal._id} for user ${goal.user}...`);

      // Aggregate total income for this user up to the goal's target date
      const totalIncome = await Income.aggregate([
        {
          $match: {
            user: goal.user,  // Match income entries by user ID
            date: { $lte: goal.targetDate }  // Only consider incomes before or on the target date
          }
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' }  // Sum the amount of all matching incomes
          }
        }
      ]);

      // Check if the total income has met or exceeded the goal's amount
      const hasMetGoal = totalIncome.length > 0 && (totalIncome[0]?.totalAmount || 0) >= goal.amount;


      console.log(`Total Income for goal ${goal._id}:`, totalIncome);
      console.log(`Has met goal: ${hasMetGoal} for goal ${goal._id}`);

      // Update the goal's 'completed' status based on the income comparison
      try {
        await Goal.findByIdAndUpdate(goal._id, { completed: hasMetGoal });
        console.log(`Updated goal ${goal._id} to ${hasMetGoal ? 'completed' : 'incomplete'}`);
      } catch (error) {
        console.error(`Failed to update goal ${goal._id}:`, error);
      }
    }

    console.log('Goal completion status update finished.');

  } catch (error) {
    console.error('Error during goal completion status update:', error);
  }
};

const setGoal = async (req, res) => {
  const { amount, targetDate, phone } = req.body;
  try {
    if (!amount || !targetDate || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Initialize the goal with 'incomplete' status
    const goal = new Goal({ user: req.user.id, amount, targetDate, phone, status: 'incomplete' });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ message: 'Internal server error' });
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

const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.json(goals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateGoal = async (req, res) => {
  const { id } = req.params;
  const { amount, targetDate, phone } = req.body;
  try {
    const goal = await Goal.findByIdAndUpdate(id, { amount, targetDate, phone }, { new: true });
    res.json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteGoal = async (req, res) => {
  const { id } = req.params;
  try {
    await Goal.findByIdAndDelete(id);
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { setGoal, getGoals, updateGoal, deleteGoal, getGoalById,updateGoalCompletionStatus };
