import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    }, 
    mobile:{
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
    gender:{
        type:String,
        enum:["male","female","other"], 
    },
    college:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    knowAbout:{
        type:String,
        required:true,
    },
    tShirtSize:{
        type:String,
        required:true,
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    transactionId:{
        type:String,
        required:true,
    },
    accomodation:{
        type:String,
        required:true,
    },
    batch:{
        type:String,
        required:true,
    },
    userType:{
        type:String,
        enum:["admin","participant"],
        default: "participant", 
    },
    participatedIn:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Participation" 
    }], 
    screenshotImage:{
        type:String, 
    },
    status:{
        type:String,
        enum:["pending","approved"],
        default:"pending"

    }
});
 
const User = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default User;