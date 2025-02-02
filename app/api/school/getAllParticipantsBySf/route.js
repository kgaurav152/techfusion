import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import SchoolStudent from "@/models/SchoolStudent";

connect();
export async function POST(req) {
  const { token } = await req.json();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);
    if (
      user?.userType !== "admin" &&
      user?.userType !== "hospitality" &&
      user?.userType !== "schoolfacilitator"
    ) {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin and hospitality access",
      });
    }
    const data = await SchoolStudent.find({ createdBy: userID }).populate(
      "createdBy"
    );
    return NextResponse.json({
      success: true,
      message: "All School Participant Fetched",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to fetch All School Participants",
    });
  }
}
