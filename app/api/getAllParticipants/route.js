import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export async function GET(req){
    try{
        const userID = await getDataFromToken(req);
        const user = await User.findById(userID);
        if(user?.userType!=="admin"){
            return NextResponse.json({
                success: false,
                message:"This is protected route for Admin access"
            })
        }
        const data = await User.find({status:{ $eq: "approved" },userType:{$ne: "admin"}}); 
        return NextResponse.json({
            success: true,
            message:"All Participant with Approved Status",
            data:data,
        })

    }catch(err){
        return NextResponse.json({
            error: err.message,
            success:false,
            message: "Unable to fetch All Participants"
        })
    }

}