const Occasion = require('../models/Occasion');

// Get all occasions
exports.getAllOccasions = async (req, res) => {
    try {
        const occasions = await Occasion.find();
        res.status(200).json(occasions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single occasion
exports.getOccasionById = async (req, res) => {
    try {
        const occasion = await Occasion.findById(req.params.id);
        if (!occasion) return res.status(404).json({ message: 'Occasion not found' });
        res.status(200).json(occasion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new occasion
exports.createOccasion = async (req, res) => {
    try {
        const { date } = req.body;
        const today = new Date().toISOString().split('T')[0];
        
        if (date < today) {
            return res.status(400).json({ message: "Date cannot be in the past" });
        }

        const occasion = new Occasion(req.body);
        await occasion.save();
        res.status(201).json(occasion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Update an occasion
exports.updateOccasion = async (req, res) => {
    try {
        const { date } = req.body;
        const today = new Date().toISOString().split('T')[0];

        if (date && date < today) {
            return res.status(400).json({ message: "Date cannot be in the past" });
        }

        const occasion = await Occasion.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!occasion) {
            return res.status(404).json({ message: 'Occasion not found' });
        }

        res.status(200).json(occasion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an occasion
exports.deleteOccasion = async (req, res) => {
    try {
        const occasion = await Occasion.findByIdAndDelete(req.params.id);
        if (!occasion) return res.status(404).json({ message: 'Occasion not found' });
        res.status(200).json({ message: 'Occasion deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
