import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import SchoolEvent from "@/models/SchoolEvent";

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
    const newSchoolEvent = await SchoolEvent.create({
      name,
      eventType,
      eventId,
      description,
      ruleBook,
      posterUrl,
      min,
      max,
    });
    const data = await SchoolEvent.find({});
    return NextResponse.json({
      success: true,
      message: "School Event created successfully",
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
