const Todo = require('../models/Todo');

const addTodo = async (req, res) => {
    const { title, dateTime, description } = req.body;

    const todo = new Todo({
        user: req.user.id, // Get logged-in user ID
        title,
        dateTime,
        description
    });

    try {
        const createdTodo = await todo.save();
        res.status(201).json(createdTodo);
    } catch (error) {
        res.status(400).json({ message: 'Invalid todo data' });
    }
};

const getUserTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id }).populate('user', 'name email');
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const editTodo = async (req, res) => {
    const { title, dateTime, description } = req.body;
    const todoId = req.params.id;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            { title, dateTime, description },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: 'Invalid todo data' });
    }
};

const deleteTodo = async (req, res) => {
    const todoId = req.params.id;

    try {
        const todo = await Todo.findByIdAndDelete(todoId);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addTodo, getUserTodos, editTodo, deleteTodo };
