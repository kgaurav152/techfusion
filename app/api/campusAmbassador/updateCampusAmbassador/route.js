import { connect } from "@/config/dbconfig";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import CampusAmbassador from "@/models/CampusAmbassador";

connect();

export async function PUT(req) {
  const {
    token,
    id,
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
        message: "This is a protected route for Admin access",
      });
    }

    const updatedCampusAmbassador = await CampusAmbassador.findByIdAndUpdate(
      id,
      {
        name,
        email,
        linkedin,
        pictureUrl,
        mobile,
        batch,
        branch,
        college,
        caId,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCampusAmbassador) {
      return NextResponse.json({
        success: false,
        message: "Campus Ambassador not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Campus Ambassador updated successfully",
      data: updatedCampusAmbassador,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to update Campus Ambassador",
    });
  }
}
