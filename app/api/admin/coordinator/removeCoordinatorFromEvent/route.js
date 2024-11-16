import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import Event from "@/models/Event";
import Coordinator from "@/models/Coordinator";
import User from "@/models/User";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(req) {
  const { token, coordinatorId, eventId } = await req.json();
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

    await Event.findByIdAndUpdate(eventId, {
      $pull: { coordinators: coordinatorId },
    });

    await Coordinator.findByIdAndUpdate(coordinatorId, {
      $pull: { events: eventId },
    });

    return NextResponse.json({
      success: true,
      message: "Coordinator removed from event successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Unable to remove coordinator from event",
    });
  }
}
