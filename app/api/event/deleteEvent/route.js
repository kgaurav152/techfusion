import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Event from "@/models/Event";
import Coordinator from "@/models/Coordinator";

connect();
export async function POST(req) {
  const { token, id } = await req.json();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);
    if (user?.userType !== "admin") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin access",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({
        success: false,
        message: "Event not found",
      });
    }

    await Coordinator.updateMany({ events: id }, { $pull: { events: id } });

    const deleteEvent = await Event.findByIdAndDelete(id);

    const data = await Event.find({});

    return NextResponse.json({
      success: true,
      message: "Event Deleted successfully, and references cleaned up",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Delete Event",
    });
  }
}
