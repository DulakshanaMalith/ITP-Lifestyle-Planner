const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    event:{
        type:Number,//data type:String
        required:true,//validate
    },date:{
        type:Number,//data type:number
        required:true,//validate
    },
    name:{
        type:String,//data type:String
        required:true,//validate
    },
    email:{
        type:String,//data type:String
        required:true,//validate
    },
    address:{
        type:Number,//data type:String
        required:true,//validate
    },
    wish:{
        type:Number,//data type:String
        required:true,//validate
    }

});

module.exports =mongoose.model(
    "UserModel",//file name 
    userSchema//function name 
)
