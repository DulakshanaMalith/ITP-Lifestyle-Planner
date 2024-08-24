const express = require('express');
const {
    addMeeting,
    getMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting,
} = require('../controllers/MeetingController');

const router = express.Router();

router.post('/', addMeeting);
router.get('/', getMeetings);
router.get('/:id', getMeetingById);
router.put('/:id', updateMeeting);
router.delete('/:id', deleteMeeting);

module.exports = router;
