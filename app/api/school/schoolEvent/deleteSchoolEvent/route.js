import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import SchoolEvent from "@/models/SchoolEvent";

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

    const schoolEvent = await SchoolEvent.findById(id);
    if (!schoolEvent) {
      return NextResponse.json({
        success: false,
        message: "School Event not found",
      });
    }

    const deleteSchoolEvent = await SchoolEvent.findByIdAndDelete(id);

    const data = await SchoolEvent.find({});

    return NextResponse.json({
      success: true,
      message: "School Event Deleted successfully!",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Delete School Event",
    });
  }
}
