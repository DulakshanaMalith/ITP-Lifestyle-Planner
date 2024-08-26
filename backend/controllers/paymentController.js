const Payment = require('../models/Payment');

// Create a new payment
const createPayment = async (req, res) => {
  const { amount, type, date, description } = req.body;

  try {
    const payment = new Payment({
      amount,
      type,
      date,
      description,
    });

    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a payment
const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { amount, type, date, description } = req.body;

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { amount, type, date, description },
      { new: true }
    );
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a payment
const deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    await Payment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Payment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  updatePayment,
  deletePayment,
};
