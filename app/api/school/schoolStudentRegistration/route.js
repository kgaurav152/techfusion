import { connect } from "@/config/dbconfig";
import { capitalize } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import SchoolStudent from "@/models/SchoolStudent";

connect();

export async function POST(request) {
  const {
    token,
    name,
    gender,
    school,
    studentClass,
    section,
    rollNo,
    parentPhoneNumber,
    registrationFee,
  } = await request.json();
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

    const fetchedName = capitalize(name);
    const fetchedStudentClass = studentClass;
    const fetchedRollNo = rollNo;
    const fetchedSchool = school;
    const fetchedSection = section;
    const fetchedParentPhoneNumber = parentPhoneNumber;
    const fetchedGender = gender;
    const fetchedRegistrationFee = registrationFee;
    const fetchedPaymentReceivedBy = null;
    const isPaymentConfirmed = false;
    const idCardAllocation = false;
    const createdBy = userID;

    const schoolCode = fetchedSchool
      .replace(/\./g, "")
      .replace(/\s+/g, "")
      .substring(0, 4)
      .toUpperCase();

    const lastStudent = await SchoolStudent.findOne({})
      .sort({ createdAt: -1 })
      .select("festId");

    let nextSerialNumber = 100;
    if (lastStudent?.festId) {
      const lastSerial = parseInt(lastStudent.festId.slice(-3), 10);
      nextSerialNumber = isNaN(lastSerial) ? 100 : lastSerial + 1;
    }

    const serialNumber = nextSerialNumber.toString().padStart(3, "0");

    const fetchedFestId = `KEC001${schoolCode}${serialNumber}`;

    const schoolStudent = await SchoolStudent.findOne({
      $and: [
        { name: fetchedName },
        { school: fetchedSchool },
        { studentClass: fetchedStudentClass },
        { rollNo: fetchedRollNo },
      ],
    });

    if (schoolStudent) {
      return NextResponse.json({
        success: false,
        message: "Student already registered",
      });
    }

    const newSchoolStudent = new SchoolStudent({
      name: fetchedName,
      gender: fetchedGender,
      rollNo: fetchedRollNo,
      school: fetchedSchool,
      studentClass: fetchedStudentClass,
      section: fetchedSection,
      parentPhoneNumber: fetchedParentPhoneNumber,
      festId: fetchedFestId,
      gender: fetchedGender,
      registrationFee: fetchedRegistrationFee,
      paymentReceivedBy: fetchedPaymentReceivedBy,
      isPaymentConfirmed,
      idCardAllocation,
      createdBy,
    });

    const savedSchoolStudent = await newSchoolStudent.save();

    return NextResponse.json({
      message: "School Student registered successfully",
      success: true,
      data: savedSchoolStudent,
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
