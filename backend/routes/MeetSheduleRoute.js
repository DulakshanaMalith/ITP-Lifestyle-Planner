const express = require('express');
const router = express.Router();
const {
    addSchedule,
    getSchedules,
    getScheduleByDate,
    updateSchedule,
    deleteSchedule
} = require('../controllers/MeetSheduleController');

router.post('/schedules', addSchedule);
router.get('/schedules', getSchedules);
router.get('/schedules/by-date', getScheduleByDate);
router.put('/schedules/:id', updateSchedule);
router.delete('/schedules/:id', deleteSchedule);

module.exports = router;