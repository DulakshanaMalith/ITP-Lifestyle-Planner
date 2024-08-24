const Income = require('../models/incomeModel');

exports.addIncome = async (req, res) => {
  try {
    const { source, amount, date } = req.body;

    // Validate that required fields are provided
    if (!source || !amount || !date) {
      return res.status(400).json({ message: 'All fields (source, amount, date) are required' });
    }

    // Validate that amount is a positive number
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    // Validate that the date is not in the future
    const currentDate = new Date();
    if (new Date(date) > currentDate) {
      return res.status(400).json({ message: 'Date cannot be in the future' });
    }

    const newIncome = new Income({
      source,
      amount,
      date,
      user: req.user.id,
    });

    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTotalIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomes = await Income.find({ user: userId });

    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);

    res.json({ totalIncome });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getLatestIncome = async (req, res) => {
  try {
    const income = await Income.findOne({ user: req.user.id }).sort({ date: -1 });
    if (!income) return res.status(404).json({ message: 'No income records found' });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  console.log('Deleting income with ID:', req.params.id);
  try {
   
    const income = await Income.findByIdAndDelete(req.params.id);

   
    if (income && income.user.toString() === req.user.id) {
      res.status(200).json({ message: 'Income record removed' });
    } else {
      res.status(404).json({ message: 'Income record not found or you are not authorized to delete this record' });
    }
  } catch (error) {
    console.error('Error deleting income:', error);
    res.status(500).json({ message: 'Failed to delete income. Please try again later.' });
  }
};



exports.getAllIncomes = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomes = await Income.find({ user: userId });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) return res.status(404).json({ message: 'Income record not found' });
    if (income.user.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    res.status(200).json(income);
  } catch (error) {
    console.error('Error fetching income by ID:', error);
    res.status(500).json({ message: 'Failed to fetch income. Please try again later.' });
  }
};

exports.updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { source, amount, date } = req.body;

    const income = await Income.findById(id);

    if (!income) {
      return res.status(404).json({ message: 'Income record not found' });
    }

    if (income.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this record' });
    }

    income.source = source || income.source;
    income.amount = amount || income.amount;
    income.date = date || income.date;

    await income.save();
    res.status(200).json(income);
  } catch (error) {
    console.error('Error updating income:', error);
    res.status(500).json({ message: 'Failed to update income. Please try again later.' });
  }
};











