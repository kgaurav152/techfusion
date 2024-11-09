import { connect } from "@/config/dbconfig";
import ResetPasswordToken from "@/models/ResetPasswordToken";
import { NextResponse } from "next/server";

// Check if the reset token is valid
export async function POST(request) {
  await connect();

  try {
    const { token } = await request.json();

    // Find token in the database
    const resetTokenRecord = await ResetPasswordToken.findOne({ token });
    if (!resetTokenRecord) {
      return NextResponse.json({ message: "Invalid token", success: false });
    }

    // Check if token is expired
    if (resetTokenRecord.expiresAt < new Date()) {
      return NextResponse.json({ message: "Token expired", success: false });
    }

    return NextResponse.json({ message: "Token is valid", success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
