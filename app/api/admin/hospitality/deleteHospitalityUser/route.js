import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

import User from "@/models/User";

export async function DELETE(req) {
  const { token, hospitalityUserId } = await req.json();
  connect();

  try {
    const userId = await getDataFromToken(token);
    const adminUser = await User.findById(userId);

    if (adminUser?.userType !== "admin") {
      return NextResponse.json({
        success: false,
        message: "This is a protected route for Admin access",
      });
    }

    const hospitalityUser = await User.findById(hospitalityUserId);
    if (!hospitalityUser) {
      return NextResponse.json({
        success: false,
        message: "Hospitality User not found",
      });
    }

    await User.findByIdAndDelete(hospitalityUserId);

    return NextResponse.json({
      success: true,
      message: "Hospitality User deleted successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Unable to delete hospitality user",
    });
  }
}
