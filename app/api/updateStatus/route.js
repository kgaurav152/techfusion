import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import {
  sendVerificationSuccessfulEmail,
  sendVerificationUnSuccessfulEmail,
} from "@/helpers/mailService";

connect();
export async function POST(req) {
  const { token, userId, status } = await req.json();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);
    if (user?.userType !== "admin") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin access",
      });
    }
    if (status == "0") {
      const participant = await User.findByIdAndDelete(userId);
      if (!participant) {
        return NextResponse.json({
          success: false,
          message: "User Not Found",
        });
      }
      const data = await User.find({ status: { $eq: "pending" } });

      // Send verification rejection email
      const emailResult = await sendVerificationUnSuccessfulEmail(
        user.email,
        participant.name
      );

      return NextResponse.json({
        success: true,
        message: "Participant has been deleted",
        data: data,
      });
    }

    const participant = await User.findByIdAndUpdate(
      userId,
      {
        status: "approved",
      },
      { new: true }
    );

    if (!participant) {
      return NextResponse.json({
        success: false,
        message: "User Not Found",
      });
    }
    const data = await User.find({ status: { $eq: "pending" } });

    // Send verification confirmation email
    const emailResult = await sendVerificationSuccessfulEmail(
      user.email,
      participant.name,
      participant.festId
    );

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
