const Itinerary = require('../models/CreateItineraryModel');
const Event = require('../models/eventModel');


// Create a new itinerary
const createItinerary = async (req, res) => {
  const { name, eventId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const newItinerary = new Itinerary({
      name,
      eventId,
    });

    const savedItinerary = await newItinerary.save();
    res.status(201).json(savedItinerary);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all itineraries
const getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find().populate('eventId');
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an itinerary
const deleteItinerary = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Itinerary.deleteOne({ _id: id });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Itinerary not found' });
      }
  
      res.status(200).json({ message: 'Itinerary deleted' });
    } catch (error) {
      console.error('Error deleting itinerary:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

module.exports = {
  createItinerary,
  getAllItineraries,
  deleteItinerary,
};
