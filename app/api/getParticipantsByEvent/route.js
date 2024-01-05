import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Participation from "@/models/Participation";
import Event from "@/models/Event";

export async function POST(req){
    const {token,event_id} = await req.json()
    connect();
    try{
        const userID = await getDataFromToken(token);
        const user = await User.findById(userID);
        if(user?.userType!=="admin"){
            return NextResponse.json({
                success: false,
                message:"This is protected route for Admin access"
            })
        } 
        const data = await Participation.find({event:event_id}).populate("event").populate("participants");
        return NextResponse.json({
            success: true,
            message:"All Participantion Details by Event",
            data:data,
        })

    }catch(err){
        return NextResponse.json({
            error: err.message,
            success:false,
            message: "Unable to fetch All Participantion Details"
        })
    }

}