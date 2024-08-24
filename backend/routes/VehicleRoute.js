const express = require('express');
const {
    addVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
} = require('../controllers/VehicleControllers');

const router = express.Router();

router.post('/', addVehicle);
router.get('/', getVehicles);
router.get('/:id', getVehicleById);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

module.exports = router;
