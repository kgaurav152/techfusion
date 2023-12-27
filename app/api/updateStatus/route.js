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
        if(user?.userType!=="admin"){
            return NextResponse.json({
                success: false,
                message:"This is protected route for Admin access"
            })
        }
        if(status=="0"){
            const participant = await User.findByIdAndDelete(userId);
            const data = await User.find({status:{ $eq: "pending" }}); 
            return NextResponse.json({
                success: true,
                message:"Participant has been deleted",
                data:data
            })
        }
        const participant = await User.findByIdAndUpdate(userId, {
            status:"approved",
        },{new:true});

        const data = await User.find({status:{ $eq: "pending" }}) 
        return NextResponse.json({
            success: true,
            message:"Participant has been Approved",
            data:data,
        })

    }catch(err){
        return NextResponse.json({
            error: err.message,
            success:false,
            message: "Unable to fetch Pending Participants"
        })
    }

}