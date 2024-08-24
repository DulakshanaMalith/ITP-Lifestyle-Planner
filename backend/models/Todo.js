const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    setDate: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Todo", todoSchema);
