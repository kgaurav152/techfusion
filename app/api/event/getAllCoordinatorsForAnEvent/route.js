import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";

connect();
export async function POST(req) {
  const { eventId } = await req.json();
  try {
    const event = await Event.findById(eventId).populate("coordinators");
    const data = event.coordinators;
    return NextResponse.json({
      success: true,
      message: "All Related Coordinators Fetched Successfully",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Fetch Coordinators for given Event",
    });
  }
}
