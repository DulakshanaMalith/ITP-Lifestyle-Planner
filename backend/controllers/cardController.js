const Card = require('../models/Card');

// Get all cards for the authenticated user
exports.getAllCards = async (req, res) => {
  const userId = req.user.id; // Get user ID from the request (e.g., from a JWT token)

  try {
    const cards = await Card.find({ user: userId }); // Find cards for the authenticated user
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a card by ID for the authenticated user
exports.getCardById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Get user ID from the request

  try {
    const card = await Card.findOne({ _id: id, user: userId }); // Find card by ID and user ID
    if (!card) {
      return res.status(404).json({ message: 'Card not found or unauthorized' });
    }
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new card for the authenticated user
exports.createCard = async (req, res) => {
  const { reminderDate, expireDate, phoneNumber } = req.body;
  const userId = req.user.id; // Get user ID from the request

  try {
    const card = new Card({ reminderDate, expireDate, phoneNumber, user: userId }); // Include user ID
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a card for the authenticated user
exports.updateCard = async (req, res) => {
  const { id } = req.params;
  const { reminderDate, expireDate, phoneNumber } = req.body;
  const userId = req.user.id; // Get user ID from the request

  try {
    const card = await Card.findOneAndUpdate(
      { _id: id, user: userId }, // Find card by ID and user ID
      { reminderDate, expireDate, phoneNumber },
      { new: true, runValidators: true }
    );
    if (!card) {
      return res.status(404).json({ message: 'Card not found or unauthorized' });
    }
    res.json(card);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a card for the authenticated user
exports.deleteCard = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Get user ID from the request

  try {
    const card = await Card.findOneAndDelete({ _id: id, user: userId }); // Find card by ID and user ID
    if (!card) {
      return res.status(404).json({ message: 'Card not found or unauthorized' });
    }
    res.json({ message: 'Card deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
