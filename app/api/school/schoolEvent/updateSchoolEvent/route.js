import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import SchoolEvent from "@/models/SchoolEvent";

export async function PUT(req) {
  const { token, eventId, updateData } = await req.json();
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

    // Ensure the eventRegistrationDateTime is less than the eventDateTime
    if (
      new Date(updateData?.eventRegistrationDateTime) >=
      new Date(updateData?.eventDateTime)
    ) {
      return NextResponse.json({
        success: false,
        message: "Event Registration Date Time must be before Event Date Time",
      });
    }

    const updatedSchoolEvent = await SchoolEvent.findByIdAndUpdate(
      eventId,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedSchoolEvent) {
      return NextResponse.json({
        success: false,
        message: "School Event not found!",
      });
    }

    return NextResponse.json({
      success: true,
      message: "School Event details updated successfully!",
      data: updatedSchoolEvent,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Unable to update school event!",
    });
  }
}
