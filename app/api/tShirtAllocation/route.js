import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export async function POST(req){
    const {token,userId,tShirtAllocation} = await req.json()
    try{
        const userID = await getDataFromToken(token);
        const user = await User.findById(userID);
        if(user?.userType!=="admin"){
            return NextResponse.json({
                success: false,
                message:"This is protected route for Admin access"
            })
        }
        const data = await User.findByIdAndUpdate(userId,{
            tShirtAllocation
        })
        return NextResponse.json({
            success: true,
            message:"Tshirt Allocation has been Done",
            data:data,
        })

    }catch(err){
        return NextResponse.json({
            error: err.message,
            success:false,
            message: "Unable to Allocate Tshirt"
        })
    }

}