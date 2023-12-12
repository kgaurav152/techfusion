import { connect } from "@/config/dbconfig";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(req){

    try{
        const userID = await getDataFromToken(req);
        const user = await User.findById(userID);
        user.password = undefined;
        return NextResponse.json({
            success: true,
            data:user
        })

    }catch(err){
        return NextResponse.json({
            error: err.message,
            success:false
        })
    }

}