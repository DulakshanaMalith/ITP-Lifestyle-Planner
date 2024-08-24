const Meeting = require('../models/Meeting');

exports.addMeeting = async (req, res) => {
    try {
        const { date } = req.body;
        const today = new Date().toISOString().split('T')[0];
        
        if (date < today) {
            return res.status(400).json({ message: "Date cannot be in the past" });
        }

        const meeting = new Meeting(req.body);
        await meeting.save();
        res.status(201).json(meeting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find();
        res.status(200).json(meetings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMeetingById = async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);
        if (!meeting) return res.status(404).json({ error: 'Meeting not found' });
        res.status(200).json(meeting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateMeeting = async (req, res) => {
    try {
        const { date } = req.body;
        const today = new Date().toISOString().split('T')[0];

        if (date && date < today) {
            return res.status(400).json({ message: "Date cannot be in the past" });
        }

        const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!meeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }

        res.status(200).json(meeting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findByIdAndDelete(req.params.id);
        if (!meeting) return res.status(404).json({ error: 'Meeting not found' });
        res.status(200).json({ message: 'Meeting deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
