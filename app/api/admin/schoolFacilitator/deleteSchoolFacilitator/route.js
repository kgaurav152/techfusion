import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

import User from "@/models/User";

export async function DELETE(req) {
  const { token, schoolFacilitatorId } = await req.json();
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

    const schoolFacilitator = await User.findById(schoolFacilitatorId);
    if (!schoolFacilitator) {
      return NextResponse.json({
        success: false,
        message: "School Facilitator not found",
      });
    }

    await User.findByIdAndDelete(schoolFacilitatorId);

    return NextResponse.json({
      success: true,
      message: "School Facilitator deleted successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Unable to delete school facilitator",
    });
  }
}
