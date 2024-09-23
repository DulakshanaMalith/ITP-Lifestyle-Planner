const Vehicle = require('../models/Vehicle');

const addVehicle = async (req, res) => {
    const { title, description, date, time } = req.body;

    const vehicle = new Vehicle({
        user: req.user.id,
        title,
        description,
        date,
        time,
    });

    try {
        const createdVehicle = await vehicle.save();
        res.status(201).json(createdVehicle);
    } catch (error) {
        res.status(400).json({ message: 'Invalid vehicle data' });
    }
};

// Get vehicles for the logged-in user
const getUserVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ user: req.user.id }).populate('user', 'name email');
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Edit a vehicle
const editVehicle = async (req, res) => {
    const { title, description, date, time } = req.body;
    const vehicleId = req.params.id;

    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            vehicleId,
            { title, description, date, time },
            { new: true, runValidators: true }
        );

        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.json(updatedVehicle);
    } catch (error) {
        res.status(400).json({ message: 'Invalid vehicle data' });
    }
};

// Delete a vehicle
const deleteVehicle = async (req, res) => {
    const vehicleId = req.params.id;

    try {
        const vehicle = await Vehicle.findByIdAndDelete(vehicleId);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addVehicle, getUserVehicles, editVehicle, deleteVehicle };
