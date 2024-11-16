import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Event from "@/models/Event";

connect();
export async function POST(req) {
  const {
    token,
    name,
    eventType,
    eventId,
    description,
    ruleBook,
    posterUrl,
    min,
    max,
  } = await req.json();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);
    if (user?.userType !== "admin") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin access",
      });
    }
    const newEvent = await Event.create({
      name,
      eventType,
      eventId,
      description,
      ruleBook,
      posterUrl,
      min,
      max,
    });
    const data = await Event.find({});
    return NextResponse.json({
      success: true,
      message: "Event created successfully",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Create Event",
    });
  }
}
