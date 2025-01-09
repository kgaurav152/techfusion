import { connect } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import SchoolStudent from "@/models/SchoolStudent";

connect();

export async function DELETE(request) {
  try {
    const { token, schoolStudentId } = await request.json();

    // Validate token and get user details
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);

    if (
      user?.userType !== "admin" &&
      user?.userType !== "hospitality" &&
      user?.userType !== "schoolfacilitator"
    ) {
      return NextResponse.json({
        success: false,
        message: "This is a protected route for Admin and hospitality access",
      });
    }

    // Find the student by ID
    const student = await SchoolStudent.findById(schoolStudentId);

    if (!student) {
      return NextResponse.json({
        success: false,
        message: "Student not found",
      });
    }

    // Check for technical or cultural participation
    if (student.technical.length > 0 || student.cultural.length > 0) {
      return NextResponse.json({
        success: false,
        message:
          "Student cannot be deleted as they have technical or cultural participation",
      });
    }

    // Delete the student
    await student.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
