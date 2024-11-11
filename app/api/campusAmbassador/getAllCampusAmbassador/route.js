import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import CampusAmbassador from "@/models/CampusAmbassador";

connect();
export async function POST() {
  try {
    const data = await CampusAmbassador.find({});
    return NextResponse.json({
      success: true,
      message: "All Campus Ambassador Fetched Successfully",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Fetch Campus Ambassador",
    });
  }
}
