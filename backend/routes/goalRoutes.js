const express = require('express');
const { setGoal, getGoals, updateGoal, deleteGoal, getGoalById } = require('../controllers/goalController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken);

router.post('/', setGoal);
router.get('/', getGoals);
router.get('/:id', getGoalById);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

module.exports = router;
