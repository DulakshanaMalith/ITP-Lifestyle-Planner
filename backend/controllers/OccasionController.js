// controllers/occasionController.js
const Occasion = require('../models/Occasion');

exports.addOccasion = async (req, res) => {
    const { title, dateTime, description } = req.body;

    try {
        const occasion = new Occasion({
            title,
            dateTime,
            description,
            user: req.user.id
        });
        await occasion.save();
        res.status(201).json(occasion);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create occasion', error });
    }
};

exports.getUserOccasions = async (req, res) => {
    try {
        const occasions = await Occasion.find({ user: req.user.id });
        res.json(occasions);
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch occasions', error });
    }
};

exports.updateOccasion = async (req, res) => {
    const { title, dateTime, description } = req.body;

    try {
        const occasion = await Occasion.findByIdAndUpdate(req.params.id, { title, dateTime, description }, { new: true });
        res.json(occasion);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update occasion', error });
    }
};

exports.deleteOccasion = async (req, res) => {
    try {
        await Occasion.findByIdAndDelete(req.params.id);
        res.json({ message: 'Occasion deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete occasion', error });
    }
};
