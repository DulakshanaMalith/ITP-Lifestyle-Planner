const Todo = require("../models/Todo");

const getAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({ todos });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

const getTodoById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ todo });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};


const addTodo = async (req, res, next) => {
    const { title, description, setDate, time } = req.body;
    let todo;

    try {
        const today = new Date().toISOString().split('T')[0];
        if (setDate < today) {
            return res.status(400).json({ message: "Set date cannot be in the past" });
        }

        todo = new Todo({
            title,
            description,
            setDate,
            time,
        });
        await todo.save();
        res.status(201).json({ todo });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

const updateTodo = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, completed, setDate, time } = req.body; // Include time here

    try {
        const today = new Date().toISOString().split('T')[0];
        if (setDate < today) {
            return res.status(400).json({ message: "Set date cannot be in the past" });
        }

        const todo = await Todo.findByIdAndUpdate(
            id,
            { title, description, completed, setDate, time }, 
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ todo });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteTodo = async (req, res, next) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAllTodos = getAllTodos;
exports.getTodoById = getTodoById;
exports.addTodo = addTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
