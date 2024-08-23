const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const meetSchema=new Schema({

    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    participants: {
        type: [String], // Array of strings to store participant names or IDs
        required: true,
    },
    notes: {
        type: String,
        required: false, // Optional field
    }
});

module.exports=mongoose.model(
    "MeetAssistModel",meetSchema
)