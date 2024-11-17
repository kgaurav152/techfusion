import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import Event from "@/models/Event";

connect();
export async function POST() {
  try {
    // const data = await Event.find();
    const data = await Event.find().populate("coordinators");
    return NextResponse.json({
      success: true,
      message: "All Event Fetched Successfully",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Fetch Event",
    });
  }
}
