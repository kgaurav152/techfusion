import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Event from "@/models/Event";

connect();
export async function POST(req){
    const {token,id} = await req.json();
    console.log(id)
    try{
        const userID = await getDataFromToken(token);
        const user = await User.findById(userID);
        if(user?.userType!=="admin"){
            return NextResponse.json({
                success: false,
                message:"This is protected route for Admin access"
            })
        }
        const deleteEvent = await Event.findByIdAndDelete(id);
             
        const data = await Event.find({});
        return NextResponse.json({
            success: true,
            message:"Event Deleted successfully",
            data:data,
        })

    }catch(err){
        return NextResponse.json({
            error: err.message,
            success:false,
            message: "Unable to Delete Event"
        })
    }

}