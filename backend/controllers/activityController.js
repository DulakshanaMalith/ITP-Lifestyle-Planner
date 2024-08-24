const Activity = require('../models/activityModel');
const Itinerary = require('../models/CreateItineraryModel'); 

// Function to check if the date and time are in the past
const isDateTimeInPast = (date, time) => {
  const currentDateTime = new Date();
  const activityDateTime = new Date(`${date}T${time}`);
  return activityDateTime < currentDateTime;
};

// Create a new activity
const createActivity = async (req, res) => {
  const { name, date, time, itineraryId } = req.body;

  try {
    if (!name || !date || !time || !itineraryId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (isDateTimeInPast(date, time)) {
      return res.status(400).json({ message: "Cannot create an activity with a past date and time" });
    }

    
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

   
    const newActivity = new Activity({
      name,
      date,
      time,
      itineraryId,
    });

    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get all activities
const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Update an activity
const updateActivity = async (req, res) => {
  const { id } = req.params;
  const { name, date, time, itineraryId } = req.body;

  try {
    if (!name || !date || !time || !itineraryId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (isDateTimeInPast(date, time)) {
      return res.status(400).json({ message: "Cannot update an activity to a past date and time" });
    }

    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { name, date, time, itineraryId },
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




// Delete an activity
const deleteActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Activity.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json({ message: 'Activity deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createActivity,
  getAllActivities,
  updateActivity,
  deleteActivity,
};
