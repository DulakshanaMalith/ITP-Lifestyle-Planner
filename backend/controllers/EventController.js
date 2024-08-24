const Event = require("../models/Event");

const getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.status(200).json({ events });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error"});
    }
};

const getEventById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ event });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

const addEvent = async (req, res, next) => {
    const { title, description, date, time } = req.body;
    let event;

    try {
        const today = new Date().toISOString().split('T')[0];
        if (date < today) {
            return res.status(400).json({ message: "Date cannot be in the past" });
        }

        event = new Event({
            title,
            description,
            date,
            time,
        });

        await event.save();
        res.status(201).json({ event });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};


const updateEvent = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, completed, date, time } = req.body;

    try {
        const today = new Date().toISOString().split('T')[0];
        if (date < today) {
            return res.status(400).json({ message: "Date cannot be in the past" });
        }

        const event = await Event.findByIdAndUpdate(
            id,
            { title, description, completed, date, time },
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ event });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteEvent = async (req, res, next) => {
    const { id } = req.params;

    try {
        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAllEvents = getAllEvents;
exports.getEventById = getEventById;
exports.addEvent = addEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
