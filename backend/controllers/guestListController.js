const GuestList = require('../models/GuestListModel');

//validate name, phone number, and email
const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
const validatePhone = (phone) => /^\d{10}$/.test(phone);
const validateEmail = (email) => /^[a-zA-Z0-9\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);


// Create a new guest
const createGuest = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!validateName(name)) {
      return res.status(400).json({ message: 'Invalid name.' });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ message: 'Invalid phone number.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }

    const guest = new GuestList(req.body);
    await guest.save();
    res.status(201).json(guest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all guests 
const getAllGuests = async (req, res) => {
    try {
      const guests = await GuestList.find().populate('eventId', 'name'); // Populate event name
      res.status(200).json(guests);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  //get guest by id
  const getGuestById = async (req, res) => {
    try {
      const { id } = req.params; // Extract 'id' from request parameters
      if (!id) {
        return res.status(400).json({ message: 'Guest ID is required' });
      }
  
      const guest = await GuestList.findById(id); // Find guest by ID without populating
      if (!guest) {
        return res.status(404).json({ message: 'Guest not found' });
      }
  
      res.status(200).json(guest);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
// Update guest details
const updateGuest = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (name && !validateName(name)) {
      return res.status(400).json({ message: 'Invalid name.' });
    }

    if (phone && !validatePhone(phone)) {
      return res.status(400).json({ message: 'Invalid phone number.' });
    }

    if (email && !validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }

    const guest = await GuestList.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.status(200).json(guest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a guest
const deleteGuest = async (req, res) => {
  try {
    const guest = await GuestList.findByIdAndDelete(req.params.id);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
    createGuest,
    getAllGuests,
    getGuestById,
    updateGuest,
    deleteGuest,
  };
  