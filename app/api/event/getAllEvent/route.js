import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Event from "@/models/Event";

connect();
export async function GET(){ 
    try{  
        const data = await Event.find({});
        return NextResponse.json({
            success: true,
            message:"All Event Fetch Successfully",
            data:data,
        })

    }catch(err){
        return NextResponse.json({
            error: err.message,
            success:false,
            message: "Unable to Fetch Event"
        })
    }

}