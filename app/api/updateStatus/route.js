import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export async function PUT(req){
    try{
        const userID = await getDataFromToken(req);
        const {userId,status} = await req.json();
        const user = await User.findById(userID);
        if(user?.userType!=="Admin"){
            return NextResponse.json({
                success: false,
                message:"This is protected route for Admin access"
            })
        }
        if(status=="0"){
            const participant = await User.findByIdAndDelete(userId);
            return NextResponse.json({
                success: false,
                message:"Participant has been deleted"
            })
        }
        const participant = await User.findByIdAndUpdate(userId, {
            status:"Approved",
        },{new:true}) 
        return NextResponse.json({
            success: true,
            message:"Participant has been Approved",
            data:participant,
        })

    }catch(err){
        return NextResponse.json({
            error: err.message,
            success:false,
            message: "Unable to fetch Pending Participants"
        })
    }

}