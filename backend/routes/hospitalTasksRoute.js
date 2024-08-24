const express = require('express');
const router = express.Router();
const hospitalTaskController = require('../controllers/hospitalTaskController');

router.get('/', hospitalTaskController.getAllTasks);
router.get("/:id", hospitalTaskController.getTaskById);
router.post('/', hospitalTaskController.createTask);

router.put('/:id', hospitalTaskController.updateTask);

router.delete('/:id', hospitalTaskController.deleteTask);

module.exports = router;
