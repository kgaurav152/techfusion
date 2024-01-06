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
    const user = await User.findById(userID)
      .populate({
        path: "participatedIn",
        populate: {
          path: "event",
        },
      })
      .populate({
        path: "participatedIn",
        populate: {
          path: "participants",
        },
      });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User in not Logged in",
      });
    }

    return NextResponse.json({
      success: true,
      message: "User Participation Details",
      data: user,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to fetch User Participation Details",
    });
  }
}
