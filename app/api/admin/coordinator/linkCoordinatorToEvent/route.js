import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import Event from "@/models/Event";
import Coordinator from "@/models/Coordinator";
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
      $addToSet: { coordinators: coordinatorId },
    });

    await Coordinator.findByIdAndUpdate(coordinatorId, {
      $addToSet: { events: eventId },
    });

    return NextResponse.json({
      success: true,
      message: "Coordinator linked to event successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Unable to link coordinator to event",
    });
  }
}
