import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function POST() {
  connect();

  try {
    const hospitalityUser = await User.find({
      userType: "hospitality",
    });
    return NextResponse.json({
      success: true,
      data: hospitalityUser,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Unable to fetch hospitality users",
    });
  }
}
