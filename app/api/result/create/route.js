import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import ResultDetail from "@/models/ResultDetails";
import Result from "@/models/Result";

connect();
export async function POST(req){
    const {token,event_round,result,event_id} = await req.json()
    try{
        const userID = await getDataFromToken(token);
        const user = await User.findById(userID);
        if(user?.userType!=="admin"){
            return NextResponse.json({
                success: false,
                message:"This is protected route for Admin access"
            })
        }
        let winner = []
        for(let i = 0;i<result.length;i++){
            const singleResult = await ResultDetail.create({
                participant:result[i].participant_id,
                rank  :result[i].rank,
                score: result[i].score,
                description: result[i].description,
            });

            winner.push(singleResult._id);
        }

        const isEvent = await Result.findOne( {$and: [{ event: event_id }, { round: event_round }]});

        if(isEvent){
            for(let i=0;i<winner.length;i++){
                 isEvent.result.push(winner[i]);
            } 
            isEvent.save();

            return NextResponse.json({
                success: true,
                message:"Result Updation Done",
                data:isEvent,
            })
        }
        const eventResult = await Result.create({
            event:event_id,
            round : event_round,
            result : winner
        })
        
        return NextResponse.json({
            success: true,
            message:"Result Creation Done",
            data:eventResult,
        })

    }catch(err){
        return NextResponse.json({
            error: err.message,
            success:false,
            message: "Unable to Create Result"
        })
    }

}