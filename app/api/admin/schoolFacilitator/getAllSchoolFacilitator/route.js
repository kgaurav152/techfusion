import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function POST() {
  connect();

  try {
    const schoolFacilitator = await User.find({
      userType: "schoolfacilitator",
    });
    return NextResponse.json({
      success: true,
      data: schoolFacilitator,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Unable to fetch school facilitators",
    });
  }
}
