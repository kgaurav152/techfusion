import { connect } from "@/config/dbconfig";
import User from "@/models/User";
import ResetPasswordToken from "@/models/ResetPasswordToken";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Reset the password
export async function POST(request) {
  await connect();

  try {
    const { token, newPassword } = await request.json();

    // Find and validate token
    const resetTokenRecord = await ResetPasswordToken.findOne({ token });
    if (!resetTokenRecord) {
      return NextResponse.json({ message: "Invalid token", success: false });
    }

    if (resetTokenRecord.expiresAt < new Date()) {
      return NextResponse.json({ message: "Token expired", success: false });
    }

    // Decode token to get userId
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Find the user and update the password
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found", success: false });
    }

    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    // Delete the reset token record from the database
    await ResetPasswordToken.deleteOne({ token });

    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        success: false,
        message: "Unable to Reset Password",
      },
      { status: 500 }
    );
  }
}
