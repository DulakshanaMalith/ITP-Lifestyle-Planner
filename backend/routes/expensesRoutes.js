const express = require('express');
const { createExpense, getExpensesByBudgetName,getAllExpenses, updateExpense, deleteExpense, deleteExpenseById } = require('../controllers/expensesController');
const router = express.Router();

router.post('/expenses', createExpense);
router.get('/expenses/:budgetName', getExpensesByBudgetName);
router.get('/expenses', getAllExpenses);
router.put('/expenses/:budgetName/:index', updateExpense);  
router.delete('/expenses/:budgetName/:index', deleteExpense); 
router.delete('/expenses/:expenseId', deleteExpenseById);

module.exports = router;
