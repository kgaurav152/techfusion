import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true, 
    },
    accountType:{
        type:String,
        enum:["Admin","Student"],
        default: "Student", 
    },
    participatedIn:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Participation" 
    }],
    token:{
        type:String,
    }, 
    status:{
        type:String,
        enum:["Pending","Approved"],
        default:"Pending"

    }
});
 
const User = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default User;