const Vehicle = require('../models/Vehicle');

// Add a new vehicle
exports.addVehicle = async (req, res) => {
    try {
        const { date } = req.body;
        const today = new Date().toISOString().split('T')[0];

        if (date < today) {
            return res.status(400).json({ message: "Date cannot be in the past" });
        }

        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get all vehicles
exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single vehicle by ID
exports.getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a vehicle
exports.updateVehicle = async (req, res) => {
    try {
        const { date } = req.body;
        const today = new Date().toISOString().split('T')[0];

        if (date && date < today) {
            return res.status(400).json({ message: "Date cannot be in the past" });
        }

        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        res.status(200).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
