import { connect } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/User";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { firstName, lastName, email, password } = reqBody;

    //check if user already exists
    const user = await User.findOne({ email: email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    //create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    console.log("response", savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
