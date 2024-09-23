const MeetSchedule = require('../models/MeetSheduleModel');

const addSchedule = async (req, res) => {
    const { date, works } = req.body;

    if (!date || !works) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const schedule = new MeetSchedule({ date, works });
        await schedule.save();
        res.status(201).json(schedule);
    } catch (error) {
        console.error('Error adding schedule:', error); // Log the error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSchedules = async (req, res) => {
    try {
        const schedules = await MeetSchedule.find();
        res.status(200).json(schedules);
    } catch (error) {
        console.error('Error fetching schedules:', error); // Log the error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getScheduleByDate = async (req, res) => {
    const { date } = req.query; // Extract the date from the query parameters
  
    try {
      // Assuming you have a MeetSchedule model
      const schedule = await MeetSchedule.find({ date: new Date(date) });
      res.status(200).json(schedule);
    } catch (error) {
      console.error('Error fetching schedule by date:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
const updateSchedule = async (req, res) => {
    try {
        const schedule = await MeetSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        console.error('Error updating schedule:', error); // Log the error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteSchedule = async (req, res) => {
    try {
        const schedule = await MeetSchedule.findByIdAndDelete(req.params.id);
        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }
        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        console.error('Error deleting schedule:', error); // Log the error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    addSchedule,
    getSchedules,
    getScheduleByDate,
    updateSchedule,
    deleteSchedule
};