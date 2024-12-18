import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
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
    eventDateTime,
    eventRegistrationDateTime,
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

    // Ensure the eventRegistrationDateTime is less than the eventDateTime
    if (new Date(eventRegistrationDateTime) >= new Date(eventDateTime)) {
      return NextResponse.json({
        success: false,
        message: "Event Registration Date Time must be before Event Date Time",
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
      eventDateTime: eventDateTime,
      eventRegistrationDateTime: eventRegistrationDateTime,
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
