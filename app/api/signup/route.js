import { connect } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/User";
import { uploadImageToCloudinary } from "@/lib/imageUploader";
import { sendOnboardingEmail } from "@/helpers/mailService";
import tempWrite from "temp-write";
import path from "path";
import fs from "fs";
connect();
export async function POST(request) {
  try {
    const reqBody = await request.formData();
    const name = reqBody.get("name");
    const email = reqBody.get("email");
    const mobile = reqBody.get("mobile");
    const password = reqBody.get("password");
    const gender = reqBody.get("gender");
    const college = reqBody.get("college");
    const branch = reqBody.get("branch");
    const batch = reqBody.get("batch");
    const knowAbout = reqBody.get("knowAbout");
    const accomodation = reqBody.get("accomodation");
    const tShirtSize = reqBody.get("tShirtSize");
    const paymentMethod = reqBody.get("paymentMethod");
    const transaction_id = reqBody.get("transaction_id");
    const ca_no = reqBody.get("ca_no");
    const registrationFee = reqBody.get("registrationFee");
    const screenshot = reqBody.get("screenshot");
    // console.log("Raw Screenshot",screenshot);
    // Converting Image to Array Buffer
    const screenshotBuffer = await screenshot.arrayBuffer();
    let mime = screenshot.type;
    let encoding = "base64";
    let base64Data = Buffer.from(screenshotBuffer).toString("base64");
    // const screenshotBufferObj = Buffer.from(screenshotBuffer);
    // console.log("ScreenShot Buffer",base64Data);
    // const tempFileDirectory = path.join(__dirname,"temp"  );
    // console.log(tempFileDirectory);
    // const tempFilePath = tempWrite.sync(screenshotBufferObj,"screenshot");
    let fileUrl = "data:" + mime + ";" + encoding + "," + base64Data;
    // console.log("file temp path",fileUrl);

    // , { dir: "../../../upload" }

    //check if user already exists
    const user = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { mobile: mobile }],
    });

    if (user) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    }

    if (paymentMethod === "ba") {
      if (!transaction_id) {
        return NextResponse.json({
          success: false,
          message: "Please Enter Valid Payment Transaction ID",
        });
      }
      const transaction = await User.findOne({ transactionId: transaction_id });
      if (transaction) {
        return NextResponse.json({
          success: false,
          message: `This transaction ID is already Used by ${transaction.festId}`,
        });
      }
    }

    // //hash passwordscreensscreenshot
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const screenshotImage = await uploadImageToCloudinary(
      fileUrl,
      process.env.FOLDER_NAME
    );
    // console.log("Clodinary screenshot Image", screenshotImage);

    // fs.unlink(tempFilePath, (err) => {
    //   if (err) {
    //     console.error("Error deleting temporary file:", err);
    //   }
    // });
    // console.log("Scheenshot Image", screenshotImage);
    // create new user
    const newUser = new User({
      name,
      email: email.toLowerCase(),
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
      festId: "KEC" + mobile,
      transactionId: transaction_id,
      ca_no,
      registrationFee,
      screenshotImage: screenshotImage.secure_url 
    });
    const savedUser = await newUser.save();

    // Send onboarding email
    const emailResult = await sendOnboardingEmail(savedUser.email, name);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
