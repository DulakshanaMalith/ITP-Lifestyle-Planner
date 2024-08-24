const express = require('express');
const router = express.Router();
const { createItinerary, getAllItineraries, deleteItinerary } = require('../controllers/CreateItineraryCon');


router.post('/createItinerary',createItinerary);
router.get('/createItinerary', getAllItineraries);
router.delete('/createItinerary/:id', deleteItinerary);

module.exports = router;
