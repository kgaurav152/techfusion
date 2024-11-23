import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import Coordinator from "@/models/Coordinator";
import Event from "@/models/Event";

connect();
export async function POST(req) {
  const { token } = await req.json();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);

    if (user?.userType !== "coordinator") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Coordinator's access",
      });
    }
    const coordinator = await Coordinator.findById(
      user?.coordinatorDetails
    ).populate("events");
    const data = coordinator.events;
    return NextResponse.json({
      success: true,
      message: "All Related Event Fetched Successfully",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Fetch Event",
    });
  }
}
