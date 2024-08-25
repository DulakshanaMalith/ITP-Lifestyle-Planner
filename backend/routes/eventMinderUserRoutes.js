const express = require("express");
const router = express.Router();

// Insert model
const User = require("../models/eventMinderUserModelmodels");

// Insert user controller
const userController = require('../controllers/eventMinderUserModelcontrollers');

router.get("/", userController.getAllUsers); // Use lowercase 'userController' as imported

// Export
module.exports = router;
