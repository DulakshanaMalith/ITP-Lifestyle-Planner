const express = require('express');
const router = express.Router();
const { addIncome, getAllIncomes, deleteIncome, updateIncome, getIncomeById, getTotalIncome } = require('../controllers/incomeController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);
router.get('/total-income', getTotalIncome);
router.post('/', addIncome);
router.get('/', getAllIncomes);

router.get('/:id', getIncomeById);
router.put('/:id', updateIncome); 
router.delete('/:id', deleteIncome);



module.exports = router;
