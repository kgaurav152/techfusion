import { connect } from "@/config/dbconfig";  
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import ResultDetail from "@/models/ResultDetails";
import Result from "@/models/Result";
import User from "@/models/User";

connect();
export async function POST(req){
    const {token,event_id} = await req.json()
    try{
        // const userID = await getDataFromToken(token);
        // const user = await User.findById(userID);
        // if(user?.userType!=="admin"){
        //     return NextResponse.json({
        //         success: false,
        //         message:"This is protected route for Admin access"
        //     })
        // }
        const data = await Result.find({event:event_id}).populate({
            path:"result",
            populate: {
                path: "participant",
                populate:{
                    path:"participants"
                }
              },
        });;
        return NextResponse.json({
            success: true,
            message:"Result Fetch Successfully",
            data:data,
        })

    }catch(err){
        return NextResponse.json({
            error: err.message,
            success:false,
            message: "Unable to Fetch Result"
        })
    }

}