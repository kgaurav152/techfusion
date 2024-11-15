import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import Coordinator from "@/models/Coordinator";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function PUT(req) {
  const { token, coordinatorId, updateData } = await req.json();
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

    const updatedCoordinator = await Coordinator.findByIdAndUpdate(
      coordinatorId,
      updateData,
      { new: true }
    );

    if (!updatedCoordinator) {
      return NextResponse.json({
        success: false,
        message: "Coordinator not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Coordinator updated successfully!",
      data: updatedCoordinator,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Unable to update coordinator",
    });
  }
}
