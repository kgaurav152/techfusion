import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export async function POST(req) {
  const { token } = await req.json();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);
    if (user?.userType !== "admin" && user?.userType !== "hospitality") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin and hospitality access",
      });
    }
    const data = await User.find({
      status: { $eq: "approved" },
      userType: { $eq: "participant" },
    });
    return NextResponse.json({
      success: true,
      message: "All Participant with Approved Status",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to fetch All Participants",
    });
  }
}
