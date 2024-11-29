import { connect } from "@/config/dbconfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import SchoolStudent from "@/models/SchoolStudent";
import User from "@/models/User";
import { NextResponse } from "next/server";

connect();
export async function POST(req) {
  const { token,participantId } = await req.json();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);
    if (user?.userType !== "admin" && user?.userType !== "hospitality") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin and hospitality access",
      });
    }
    const data = await SchoolStudent.findById(participantId).
    populate({
      path : "technical",
      populate:["schoolEvent","participants"]
    })
    .populate({
      path : "cultural",
      populate:["schoolEvent","participants"]
    });
    return NextResponse.json({
      success: true,
      message: "All School Participant Fetched",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to fetch All School Participants",
    });
  }
}