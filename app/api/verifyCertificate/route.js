import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(req){ 
    const {certId} = await req.json() 
    try{ 
        const user = await User.findOne({festId:certId.toUpperCase()}) .populate({
            path: "technical",
            populate: {
              path: "event",
            },
          }) .populate({
            path: "cultural",
            populate: {
              path: "event",
            },
          }); 
        return NextResponse.json({
            success: true,
            data:{
                name : user.name,
                certId : user.festId,
                college : user.college,
                participatedIn : [...user.technical,...user.cultural]
            }
        })

    }catch(err){
        return NextResponse.json({
            error: err.message,
            success:false
        })
    }

}