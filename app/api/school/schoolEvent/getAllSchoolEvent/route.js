import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import SchoolEvent from "@/models/SchoolEvent";

connect();
export async function POST() {
  try {
    const data = await SchoolEvent.find();
    return NextResponse.json({
      success: true,
      message: "All School Event Fetched Successfully",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Fetch School Event",
    });
  }
}
