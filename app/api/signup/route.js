import { connect } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/User";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { name, email,mobile, password,gender,college,branch,batch,knowAbout,accomodation,tShirtSize,paymentMethod,transaction_id } = reqBody;
    console.log(reqBody)
    // const screenshot = reqBody.files.screenshot;

    //check if user already exists
    const user = await User.findOne({ $or:[{ email: email.toLowerCase()},{mobile:mobile}]});

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);


    // const screenshotImage = await uploadImageToCloudinary(screenshot,process.env.FOLDER_NAME);
    //create new user
    const newUser = new User({
      name,
      email : email.toLowerCase(),
      mobile,
      password: hashPassword,
      gender,
      college,
      branch,
      knowAbout,
      tShirtSize,
      paymentMethod,
      accomodation,
      batch,
      festId : "KEC"+mobile,
      transactionId:transaction_id,
      // screenshotImage:screenshotImage.secure_url
    });
    const savedUser = await newUser.save(); 

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ 
      success:false,
      error: error.message 
    }, { status: 500 });
  }
}
