import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

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

    const user = await User.create({
      name,
      festId: "TCO" + mobile,
      mobile,
      email,
      password,
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
      email,
      gender,
      linkedin,
      instaId,
      pictureUrl,
      mobile,
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
