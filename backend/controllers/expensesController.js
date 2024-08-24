const Expense = require('../models/ExpensesModel');

const createExpense = async (req, res) => {
  try {
    const { budgetName, expenses } = req.body;
    const newExpense = new Expense({ budgetName, expenses });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense', error });
  }
};

const getExpensesByBudgetName = async (req, res) => {
  try {
    const { budgetName } = req.params;
    const expenses = await Expense.findOne({ budgetName });
    if (expenses) {
      res.json(expenses);
    } else {
      res.status(200).json({ message: 'Expenses not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving expenses', error });
  }
};

const getAllExpenses = async (req, res) => {
    try {
      const expenses = await Expense.find();
      if (expenses.length > 0) {
        res.json(expenses);
      } else {
        res.status(200).json({ message: 'No expenses found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving expenses', error });
    }
  };
  

const updateExpense = async (req, res) => {
  try {
    const { budgetName, index } = req.params;
    const { name, amount } = req.body;

    const expenseDoc = await Expense.findOne({ budgetName });
    if (expenseDoc) {
      expenseDoc.expenses[index] = { name, amount };
      await expenseDoc.save();
      res.json(expenseDoc);
    } else {
      res.status(404).json({ message: 'Expenses not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense', error });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { budgetName, index } = req.params;

    const expenseDoc = await Expense.findOne({ budgetName });
    if (expenseDoc) {
      expenseDoc.expenses.splice(index, 1);
      await expenseDoc.save();
      res.json(expenseDoc);
    } else {
      res.status(200).json({ message: 'Expenses not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense', error });
  }
};

// Delete an expense by ID
const deleteExpenseById = async (req, res) => {
    try {
      const { expenseId } = req.params;
      const result = await Expense.findByIdAndDelete(expenseId);
  
      if (!result) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
  createExpense,
  getExpensesByBudgetName,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  deleteExpenseById,
};
