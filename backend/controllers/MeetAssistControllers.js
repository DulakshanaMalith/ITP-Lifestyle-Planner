const Meet=require("../models/MeetAssistModel");

const getAllMeetings=async(req,res,next)=>{
    let meetings;

    try{
        meetings=await Meet.find();

    }catch(err){
        console.log(err);
    }
    if(!meetings){
        return res.status(404).json({message:"You have not any meetings."});
    }

    //Display all meetings details
    return res.status(200).json({meetings});

};

//data insert
const addMeet=async(req, res, next) =>{
    const{ name,date,startTime,endTime,location,participants,notes }=req.body;

    let meeting;
    try{
        meeting=new Meet({ name,date,startTime,endTime,location,participants,notes });
        await meeting.save();
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
    //not insert meeting
    if(!meeting){
        return res.status(404).send({message:"unable to add meeting"});
    }
    return res.status(200).send({message:"meeting succefully added"});

};

//Get by Id
const getById=async(req, res,next)=>{
    const id=req.params.id;
    let meeting;
    try{
        meeting=await Meet.findById(id);
    }catch (err){
        console.log(err);

    }
    //not available 
    if(!meeting){
        return res.status(404).json({message:"meeting not found"});
    }
    return res.status(200).json({meeting});
}


//update meetind
const updateMeeting=async(req, res, next)=>{
    const id=req.params.id;
    const{ name,date,startTime,endTime,location,participants,notes }=req.body;

    let meetings;
    try{
        meetings=await Meet.findByIdAndUpdate(id,{name:name,date:date,startTime:startTime,endTime:endTime,location:location,participants:participants,notes:notes });
        meetings=await meetings.save();
    }catch(err){
        console.log(err);

    }
    if(!meetings){
        return res.status(404).json({message:"uanble to update"});
    }
    return res.status(200).json({meetings});
}

//Delete meeting
const deleteMeeting=async(req, res, next)=>{
    const id=req.params.id;
    let meet;
    try{
        meet=await Meet.findByIdAndDelete(id)
    }catch(err){
        console.log(err);

    }
    if(!meet){
        return res.status(404).json({message:"uanble to cancle"});
    }
    return res.status(200).json({meet});

}


exports.getAllMeetings=getAllMeetings;

exports.addMeet=addMeet;

exports.getById=getById;

exports.updateMeeting=updateMeeting;

exports.deleteMeeting=deleteMeeting;