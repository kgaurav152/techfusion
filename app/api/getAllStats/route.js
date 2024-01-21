import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import {colleges} from '@/public/constants'
connect();
export async function POST(req){
    const {token} = await req.json()
    try{
        const userID = await getDataFromToken(token);
        const user = await User.findById(userID);
        if(user?.userType!=="admin"){
            return NextResponse.json({
                success: false,
                message:"This is protected route for Admin access"
            })
        }
        const data = await User.find({userType:"participant"});
        const accomodationYes = data.filter((user) => user.accomodation === "Yes");
        const accomodation = {
            yes : accomodationYes.length,
            no : data.length - accomodationYes.length,

        }
        const pending = data.filter((user) => user.status === "pending");
        const allParticipants = {
            pending : pending.length,
            approved : data.length - pending.length,
            total : data.length
        }
        const tShirtNo = data.filter((user) => user.tShirtSize === "No");
        const tshirt = {
            yes : data.length - tShirtNo.length,
            no : tShirtNo.length,

        }
        const collegeParticipation = colleges.map((col)=>{
            const temp = data.filter((user) => user.college === col.value)
            if(temp.length >= 0) {
                return{
                    college : col.label,
                    totalStudent : temp.length,
                }
            }
            
        }) 
        let sum = 0;
        data.map((user)=>{
            sum = sum + parseInt(user.registrationFee);
            
        }) 
        const totalAmount = sum
        return NextResponse.json({
            success:true,
            message: "All Stats",
            data :{
                accomodation,
                tshirt,
                collegeParticipation,
                totalAmount,
                allParticipants,

            }
        })

    }catch(err){
        return NextResponse.json({
            error: err.message,
            success:false,
            message: "Unable to gett all stats"
        })
    }

}