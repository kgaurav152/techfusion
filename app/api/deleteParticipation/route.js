import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Participation from "@/models/Participation";

connect();
export async function POST(req){
    const {token,participation_id} = await req.json()
    try{
        const userID = await getDataFromToken(token);
        const user = await User.findById(userID);
        
        const participation = await Participation.findById(participation_id);

        if(participation.participants[0] !== user._id){
            return NextResponse.json({
                success: false,
                message:"Only Team Leader can delete it",
            })
        }
       

    }catch(err){
        return NextResponse.json({
            error: err.message,
            success:false,
            message: "Unable to fetch All Participants"
        })
    }

}