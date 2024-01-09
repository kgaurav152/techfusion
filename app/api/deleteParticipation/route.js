import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Participation from "@/models/Participation";

connect();
export async function POST(req) {
  const { token, participation_id } = await req.json();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);

    const participation = await Participation.findById(
      participation_id
    ).populate("event");

    if (participation.participants[0] != userID) {
      return NextResponse.json({
        success: false,
        message: "Only Team Leader can delete it",
      });
    }

    if (participation.event.eventType === "Technical") {
      for (let i = 0; i < participation.participants.length; i++) {
        await User.findByIdAndUpdate(participation.participants[i], {
          $pull: { technical: participation._id },
        });
      }
    } else if (participation.event.eventType === "Cultural") {
      for (let i = 0; i < participation.participants.length; i++) {
        await User.findByIdAndUpdate(participation.participants[i], {
          $pull: { cultural: participation._id },
        });
      }
    }
    await Participation.findByIdAndDelete(participation._id);
    const data = await User.findById(user._id)
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
