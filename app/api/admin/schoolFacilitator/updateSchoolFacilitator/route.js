import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function PUT(req) {
  const { token, schoolFacilitatorId, updateData } = await req.json();
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

    const updatedSchoolFacilitator = await User.findByIdAndUpdate(
      schoolFacilitatorId,
      updateData,
      { new: true }
    );

    if (!updatedSchoolFacilitator) {
      return NextResponse.json({
        success: false,
        message: "School Facilitator not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "School Facilitator updated successfully!",
      data: updatedSchoolFacilitator,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Unable to update school facilitator",
    });
  }
}
