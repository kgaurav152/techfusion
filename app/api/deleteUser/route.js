import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export async function POST(req) {
  const { token, userId } = await req.json();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);
    if (user?.userType !== "admin") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin access",
      });
    }

    const participant = await User.findByIdAndDelete(userId);
    if (!participant) {
      return NextResponse.json({
        success: false,
        message: "User Not Found",
      });
    }

    const data = await User.find({ status: { $eq: "approved" } });
    return NextResponse.json({
      success: true,
      message: "Participant has been Approved",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to fetch Pending Participants",
    });
  }
}
