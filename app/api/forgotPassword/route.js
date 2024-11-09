import { connect } from "@/config/dbconfig";
import User from "@/models/User";
import ResetPasswordToken from "@/models/ResetPasswordToken";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "@/helpers/mailService";

export async function POST(request) {
  connect();

  try {
    const reqBody = await request.json();
    const { email, clientUrl } = reqBody;

    //check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({
        message: "User doesn't exist",
        success: false,
      });
    }

    // Check for existing reset token
    let resetTokenRecord = await ResetPasswordToken.findOne({
      userId: user._id,
    });

    if (resetTokenRecord) {
      // Check if the existing token is expired
      if (resetTokenRecord.expiresAt < new Date()) {
        // Token expired, generate a new token and update
        const tokenData = { userId: user._id };
        const newToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
          expiresIn: "1h",
        });

        resetTokenRecord.token = newToken;
        resetTokenRecord.expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry
        await resetTokenRecord.save();
      }
    } else {
      // No existing token, create a new one
      const tokenData = { userId: user._id };
      const newToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
      });

      resetTokenRecord = await ResetPasswordToken.create({
        userId: user._id,
        token: newToken,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiry
      });
    }

    // Generate reset link with the token
    const resetUrl = `${clientUrl}?token=${resetTokenRecord.token}`;

    // Send reset password email
    const emailResult = await sendResetPasswordEmail(user.email, resetUrl);
    if (!emailResult.success) {
      return NextResponse.json({
        message: "Failed to send email",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Password reset email sent",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
