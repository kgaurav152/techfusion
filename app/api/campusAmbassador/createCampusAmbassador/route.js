import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import CampusAmbassador from "@/models/CampusAmbassador";

connect();

export async function POST(req) {
  const {
    token,
    name,
    email,
    linkedin,
    pictureUrl,
    mobile,
    batch,
    branch,
    college,
    caId,
  } = await req.json();

  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);

    if (user?.userType !== "admin") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin access",
      });
    }

    const newCampusAmbassador = await CampusAmbassador.create({
      name,
      email,
      linkedin,
      pictureUrl,
      mobile,
      batch,
      branch,
      college,
      caId,
    });

    const data = await CampusAmbassador.find({});

    return NextResponse.json({
      success: true,
      message: "Campus Ambassador added successfully",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to add Campus Ambassador",
    });
  }
}
