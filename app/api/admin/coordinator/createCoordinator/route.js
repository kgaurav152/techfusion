import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import bcryptjs from "bcryptjs";

import User from "@/models/User";
import Coordinator from "@/models/Coordinator";

export async function POST(req) {
  const {
    token,
    name,
    mobile,
    email,
    password,
    gender,
    branch,
    batch,
    linkedin,
    instaId,
    pictureUrl,
  } = await req.json();
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
      $or: [
        { email: email.toLowerCase() },
        { mobile: "000" + mobile.substring(0, 7) },
      ],
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "Coordinator already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const user = await User.create({
      name,
      festId: "TCO111" + mobile.substring(0, 7),
      mobile: "000" + mobile.substring(0, 7),
      email: email.toLowerCase(),
      password: hashPassword,
      gender,
      college: "Katihar Engineering College, Katihar",
      branch,
      knowAbout: "College Administration",
      registrationFee: "0",
      tShirtSize: "FREE",
      paymentMethod: "Organizer",
      transactionId: "KECTFCO123",
      accomodation: "NO",
      batch,
      userType: "coordinator",
      status: "approved",
    });

    const coordinator = await Coordinator.create({
      userId: user._id,
      name,
      email: email.toLowerCase(),
      gender,
      linkedin,
      instaId,
      pictureUrl,
      mobile,
      branch,
      batch,
      events: [],
    });

    user.coordinatorDetails = coordinator._id;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Coordinator Registered Successfully!",
      data: coordinator,
    });
  } catch (error) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Create Coordinator",
    });
  }
}
