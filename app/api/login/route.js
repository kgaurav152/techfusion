import { connect } from "@/config/dbconfig";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  connect();
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    //check if user exiests
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) {
      return NextResponse.json({
        message: "User doesn't exist",
        success: false,
      });
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ message: "Invalid Password", success: false });
    }
    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
      data: {
        userType: user.userType,
      },
    });

    const options = {
      httpOnly: true, // Prevent client-side access
      secure: true, // Use secure cookies in production
      sameSite: "strict", // Prevent cross-site request forgery
      path: "/", // Make the cookie available to all routes
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    };

    response.cookies.set("token", token);
    response.cookies.set("userType", user.userType);	
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
