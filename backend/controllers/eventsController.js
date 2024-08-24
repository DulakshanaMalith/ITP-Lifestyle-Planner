const Event = require("../models/eventModel");

// Utility function to check if a date and time are in the past
const isDateTimeInPast = (date, time) => {
  const currentDateTime = new Date();
  const eventDateTime = new Date(`${date}T${time}`);
  return eventDateTime < currentDateTime;
};

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { name, date, time, location, totalGuests, note } = req.body;

    if (isDateTimeInPast(date, time)) {
      return res.status(400).json({ message: "Cannot create an event in the past" });
    }

    const newEvent = new Event({
      name,
      date,
      time,
      location,
      totalGuests,
      note,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Failed to create event", error: error.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve events", error: error.message });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve event", error: error.message });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const { name, date, time, location, totalGuests, note } = req.body;

    if (isDateTimeInPast(date, time)) {
      return res.status(400).json({ message: "Cannot update an event to a past date and time" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { name, date, time, location, totalGuests, note },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Failed to update event", error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
