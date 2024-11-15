import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

import Coordinator from "@/models/Coordinator";
import User from "@/models/User";
import Event from "@/models/Event";

export async function DELETE(req) {
  const { token, coordinatorId } = await req.json();
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

    const coordinator = await Coordinator.findById(coordinatorId);
    if (!coordinator) {
      return NextResponse.json({
        success: false,
        message: "Coordinator not found",
      });
    }

    await Event.updateMany(
      { coordinators: coordinatorId },
      { $pull: { coordinators: coordinatorId } }
    );

    await User.findByIdAndDelete(coordinator.userId);
    await Coordinator.findByIdAndDelete(coordinatorId);

    return NextResponse.json({
      success: true,
      message: "Coordinator deleted successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Unable to delete coordinator",
    });
  }
}
