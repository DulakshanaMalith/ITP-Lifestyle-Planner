const express = require('express');
const router = express.Router();
const OccasionController = require('../controllers/OccasionController');

router.get('/', OccasionController.getAllOccasions);
router.get('/:id', OccasionController.getOccasionById);
router.post('/', OccasionController.createOccasion);
router.put('/:id', OccasionController.updateOccasion);
router.delete('/:id', OccasionController.deleteOccasion);

module.exports = router;
