import { connect } from "@/config/dbconfig";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { schools } from "@/public/constants";
import User from "@/models/User";
import SchoolStudent from "@/models/SchoolStudent";
connect();
export async function POST(req) {
  const { token } = await req.json();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);
    if (user?.userType !== "admin" && user?.userType !== "hospitality") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin and Hospitality access",
      });
    }
    const data = await SchoolStudent.find();

    const pending = data.filter(
      (schoolStudent) => schoolStudent.isPaymentConfirmed === false
    );
    const confirmed = data.filter(
      (schoolStudent) => schoolStudent.isPaymentConfirmed === true
    );
    const allSchoolStudents = {
      pending: pending.length,
      approved: data.length - pending.length,
      total: data.length,
    };
    const idCardAllocatedNo = data.filter(
      (schoolStudent) => schoolStudent.idCardAllocation === false
    );
    const idCardAllocation = {
      total: data.length,
      yes: data.length - idCardAllocatedNo.length,
      no: idCardAllocatedNo.length,
    };
    const schoolParticipation = schools.map((col) => {
      const temp = data.filter(
        (schoolStudent) => schoolStudent.school === col.value
      );
      if (temp.length > 0) {
        return {
          school: col.label,
          totalStudent: temp.length,
        };
      }
      return null;
    });

    const schoolData = schoolParticipation.filter((school) => school !== null);

    let sum = 0;
    confirmed.map((schoolStudent) => {
      sum = sum + parseInt(schoolStudent.registrationFee);
    });
    const totalAmount = sum;

    return NextResponse.json({
      success: true,
      message: "Fetched All School Stats",
      data: {
        idCardAllocation,
        schoolParticipation: schoolData,
        totalAmount,
        allSchoolStudents,
      },
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to get all stats",
    });
  }
}
