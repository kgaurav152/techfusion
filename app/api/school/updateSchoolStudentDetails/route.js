import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import SchoolStudent from "@/models/SchoolStudent";
import User from "@/models/User";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function PUT(req) {
  const { token, schoolStudentId, updateData } = await req.json();
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

    const updatedSchoolStudent = await SchoolStudent.findByIdAndUpdate(
      schoolStudentId,
      updateData,
      { new: true }
    );

    if (!updatedSchoolStudent) {
      return NextResponse.json({
        success: false,
        message: "School Student not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "School Student details updated successfully!",
      data: updatedSchoolStudent,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Unable to update school student details",
    });
  }
}
