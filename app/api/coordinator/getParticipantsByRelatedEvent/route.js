import { connect } from "@/config/dbconfig";
import User from "@/models/User";
import { ObjectId } from "mongodb";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Participation from "@/models/Participation";
import Event from "@/models/Event";

export async function POST(req) {
  const { token, event_id } = await req.json();
  connect();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);
    if (user?.userType !== "admin" && user?.userType !== "coordinator") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin and coordinator's access",
      });
    }
    const eventId = new ObjectId(event_id);

    const data = await Participation.find({ event: eventId })
      .populate("event")
      .populate("participants");
    if (data?.length === 0) {
      return NextResponse.json({
        success: true,
        message: "All Participantion Details by Event",
        data: data,
      });
    }
    if (data?.event?.coordinators.includes(user.coordinatorDetails)) {
      return NextResponse.json({
        success: true,
        message: "All Participantion Details by Event",
        data: data,
      });
    }

    return NextResponse.json({
      success: false,
      message:
        "This is protected route for coordinator's access for related event only!",
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to fetch All Participantion Details",
    });
  }
}
