const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  budgetName: { type: String, required: true },
  expenses: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Expense', expenseSchema);
