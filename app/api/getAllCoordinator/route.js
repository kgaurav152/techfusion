import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import Coordinator from "@/models/Coordinator";

export async function GET() {
  connect();

  try {
    const coordinators = await Coordinator.find().populate("events");
    return NextResponse.json({
      success: true,
      data: coordinators,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Unable to fetch coordinators",
    });
  }
}
