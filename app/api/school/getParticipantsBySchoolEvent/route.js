import { connect } from "@/config/dbconfig";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import SchoolEvent from "@/models/SchoolEvent";
import SchoolParticipation from "@/models/SchoolParticipation";

export async function POST(req) {
  const { token, schoolEvent_id } = await req.json();
  connect();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);
    if (user?.userType !== "admin" && user?.userType !== "hospitality") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin and hospitality access",
      });
    }
    const schoolEventId = new ObjectId(schoolEvent_id);

    const data = await SchoolParticipation.find({ schoolEvent: schoolEventId })
      .populate("schoolEvent")
      .populate("participants");
    return NextResponse.json({
      success: true,
      message: "Fetched All Participantion Details by School Event",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to fetch All Participantion Details",
    });
  }
}
