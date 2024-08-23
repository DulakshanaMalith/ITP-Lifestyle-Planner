const express=require("express");
const router=express.Router();
//insert model
const Meet=require("../models/MeetAssistModel");

//insert controller
const meetAssistController = require('../controllers/MeetAssistControllers');


router.get("/",meetAssistController.getAllMeetings);
router.post("/",meetAssistController.addMeet);
router.get("/:id",meetAssistController.getById);
router.put("/:id",meetAssistController.updateMeeting);
router.delete("/:id",meetAssistController.deleteMeeting);

module.exports=router;