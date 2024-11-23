import { connect } from "@/config/dbconfig";
import { capitalize } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import SchoolStudent from "@/models/SchoolStudent";

connect();

export async function POST(request) {
  try {
    const userID = await getDataFromToken(request.token);
    const user = await User.findById(userID);
    if (user?.userType !== "admin" && user?.userType !== "hospitality") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin and hospitality access",
      });
    }

    const reqBody = await request.formData();

    const name = capitalize(reqBody.get("name"));
    const studentClass = reqBody.get("studentClass");
    const rollNo = reqBody.get("rollNo");
    const school = reqBody.get("school");
    const section = reqBody.get("section");
    const parentPhoneNumber = reqBody.get("parentPhoneNumber");
    const festId =
      "KEC001" +
      reqBody.get("school").trim().substring(0, 4) +
      "3 digit randomNumber"; //randomNo or serially assigned number;
    const gender = reqBody.get("gender");
    const registrationFee = reqBody.get("registrationFee");
    const paymentReceivedBy = reqBody.get("paymentReceivedBy");
    const isPaymentConfirmed = false;
    const idCardAllocation = false;

    const schoolStudent = await SchoolStudent.findOne({
      $and: [
        { name: name },
        { schoolName: capitalize(schoolName) },
        { studentClass: studentClass },
        { rollNo: rollNo },
      ],
    });

    if (schoolStudent) {
      return NextResponse.json({
        success: false,
        message: "Student already registered",
      });
    }

    const newSchoolStudent = new SchoolStudent({
      name,
      gender,
      rollNo,
      school,
      sectionsection,
      parentPhoneNumber,
      festId,
      gender,
      registrationFee,
      paymentReceivedBy,
      isPaymentConfirmed,
      idCardAllocation,
    });

    const savedSchoolStudent = await newSchoolStudent.save();

    return NextResponse.json({
      message: "School Student registered successfully",
      success: true,
      savedSchoolStudent,
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
