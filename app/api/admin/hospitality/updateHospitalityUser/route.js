import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function PUT(req) {
  const { token, hospitalityUserId, updateData } = await req.json();
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

    const updatedHospitalityUser = await User.findByIdAndUpdate(
      hospitalityUserId,
      updateData,
      { new: true }
    );

    if (!updatedHospitalityUser) {
      return NextResponse.json({
        success: false,
        message: "Hospitality User not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Hospitality User updated successfully!",
      data: updatedHospitalityUser,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Unable to update hospitality user",
    });
  }
}
