import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import bcryptjs from "bcryptjs";

import User from "@/models/User";

export async function POST(req) {
  const { token, name, email, password } = await req.json();
  connect();

  try {
    const userID = await getDataFromToken(token);
    const adminUser = await User.findById(userID);

    if (adminUser?.userType !== "admin") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin access",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }],
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "School Facilitator already exists",
      });
    }

    const length = 10;
    const mobile = Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    ).toString();

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const user = await User.create({
      name,
      festId: "TCO114" + mobile.substring(0, 7),
      mobile: "001" + mobile.substring(0, 7),
      email: email.toLowerCase(),
      password: hashPassword,
      gender: "Male",
      college: "Katihar Engineering College, Katihar",
      branch: "Computer Science & Engineering",
      knowAbout: "College Administration",
      registrationFee: "0",
      tShirtSize: "FREE",
      paymentMethod: "Organizer",
      transactionId: "KECTFCO123",
      accomodation: "NO",
      batch: "2K21",
      userType: "schoolfacilitator",
      status: "approved",
    });

    return NextResponse.json({
      success: true,
      message: "School Facilitator Registered Successfully!",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Create School Facilitator",
    });
  }
}
