const HospitalTask = require('../models/HospitalTask');

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await HospitalTask.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await HospitalTask.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error });
    }
};


// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { date } = req.body;
        const today = new Date().toISOString().split('T')[0];
        
        if (date < today) {
            return res.status(400).json({ message: "Date cannot be in the past" });
        }

        const task = new HospitalTask(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error creating task', error });
    }
};

// Update a task by ID

exports.updateTask = async (req, res) => {
    try {
        const { date } = req.body;
        const today = new Date().toISOString().split('T')[0];

        if (date && date < today) {
            return res.status(400).json({ message: "Date cannot be in the past" });
        }

        const task = await HospitalTask.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error });
    }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
    try {
        const task = await HospitalTask.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};
