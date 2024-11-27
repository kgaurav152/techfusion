import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import SchoolStudent from "@/models/SchoolStudent";
import SchoolParticipation from "@/models/SchoolParticipation";

connect();
export async function POST(req) {
  const { token, participationId } = await req.json();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);

    if (user?.userType !== "admin" && user?.userType !== "hospitality") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin and hospitality access",
      });
    }

    const schoolParticipation = await SchoolParticipation.findById(
      participationId
    ).populate("schoolEvent");

    if (schoolParticipation.schoolEvent.eventType === "Technical") {
      for (let i = 0; i < schoolParticipation.participants.length; i++) {
        await SchoolStudent.findByIdAndUpdate(
          schoolParticipation.participants[i],
          {
            $pull: { technical: schoolParticipation._id },
          }
        );
      }
    } else if (schoolParticipation.event.eventType === "Cultural") {
      for (let i = 0; i < schoolParticipation.participants.length; i++) {
        await SchoolStudent.findByIdAndUpdate(
          schoolParticipation.participants[i],
          {
            $pull: { cultural: schoolParticipation._id },
          }
        );
      }
    }
    await SchoolParticipation.findByIdAndDelete(schoolParticipation._id);
    const data = await SchoolStudent.findById(
      schoolParticipation.participants[0]._id
    )
      .populate({
        path: "technical",
        populate: {
          path: "event",
        },
      })
      .populate({
        path: "technical",
        populate: {
          path: "participants",
        },
      })
      .populate({
        path: "cultural",
        populate: {
          path: "event",
        },
      })
      .populate({
        path: "cultural",
        populate: {
          path: "participants",
        },
      });
    return NextResponse.json({
      success: true,
      message: "Participation to Event was deleted successfully",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Delete Event Participation",
    });
  }
}
