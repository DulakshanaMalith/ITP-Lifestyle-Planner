const User = require ("../models/eventMinderUserModelmodels");

const getAllUsers =async(req,res,next)=>{
    let Users;
//get all users
    try{
        users=await User.find();
    }catch (err){
        console.log(err);
    }
    if (!users){
        return res.status(404).json({message:"use not found"});
    }
    //display all users
    return res.status(200).json({ users});

};

exports.getAllUsers = getAllUsers;