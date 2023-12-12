import { connect } from "@/config/dbconfig";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

connect();

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {email, password} =reqBody; 
        //check if user exiests
        const user = await User.findOne({email:email})
        if (!user){
                
            return NextResponse.json({
                message:"User doesn't exist",success:false})
        } 

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({message:"Invalid Password",success:false})
        }
        //create token data
        const tokenData = {
            id: user._id,
            username:user.username,
            email:user.email
        }

        //create token
        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login Successfull",
            success: true,
            token
        })
        response.cookies.set("token",token, {
            httpOnly: true,
        })
        return response;
    
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}