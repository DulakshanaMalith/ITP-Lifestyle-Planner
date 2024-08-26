const express = require('express');
const {
  createPayment,
  getAllPayments,
  updatePayment,
  deletePayment,
} = require('../controllers/paymentController');

const router = express.Router();

// Route to create a new payment
router.post('/', createPayment);

// Route to get all payments
router.get('/', getAllPayments);

// Route to update a payment
router.put('/:id', updatePayment);

// Route to delete a payment
router.delete('/:id', deletePayment);

module.exports = router;
