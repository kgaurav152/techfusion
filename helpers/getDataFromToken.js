import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const getDataFromToken = (req)=>{
    try{
        const token = req.cookies.get("token")?.value || '';

            const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET);
            return decodedToken.id;
    
    } catch(err){
        console.log("Error in verifing token")
        throw new Error(err.message)
    }
}