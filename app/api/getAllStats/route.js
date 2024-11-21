import { connect } from "@/config/dbconfig";
import User from "@/models/User";
// import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { colleges } from "@/public/constants";
connect();
export async function POST(req) {
  const { token } = await req.json();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);
    if (user?.userType !== "admin" && user?.userType !== "hospitality") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin and Hospitality access",
      });
    }
    const data = await User.find({ userType: "participant" });
    const accomodationYes = data.filter((user) => user.accomodation === "Yes");
    const accomodation = {
      yes: accomodationYes.length,
      no: data.length - accomodationYes.length,
    };

    let allotedAccomodation = 0;
    accomodationYes.map((user) => {
      if (user.roomAllocation == true) {
        allotedAccomodation++;
      }
    });
    const totalAccomodation = {
      total: accomodationYes.length,
      alloted: allotedAccomodation,
      pending: accomodationYes.length - allotedAccomodation,
    };
    const pending = data.filter((user) => user.status === "pending");
    const allParticipants = {
      pending: pending.length,
      approved: data.length - pending.length,
      total: data.length,
    };
    const tShirtNo = data.filter((user) => user.tShirtSize === "No");
    const tshirt = {
      yes: data.length - tShirtNo.length,
      no: tShirtNo.length,
    };

    let allotedTshirt = 0;
    data.map((user) => {
      if (user.tshirtAllocation == true) {
        allotedTshirt++;
      }
    });
    const totalTshirtDetails = {
      total: data.length - tShirtNo.length,
      alloted: allotedTshirt,
      pending: data.length - tShirtNo.length - allotedTshirt,
    };
    const idCardAllocatedNo = data.filter(
      (user) => user.idCardAllocation === false
    );
    const idCardAllocation = {
      total: data.length,
      yes: data.length - idCardAllocatedNo.length,
      no: idCardAllocatedNo.length,
    };
    const collegeParticipation = colleges.map((col) => {
      const temp = data.filter((user) => user.college === col.value);
      if (temp.length > 0) {
        return {
          college: col.label,
          totalStudent: temp.length,
        };
      }
      return null;
    });

    const collegeData = collegeParticipation.filter(
      (college) => college !== null
    );

    let sum = 0;
    data.map((user) => {
      sum = sum + parseInt(user.registrationFee);
    });
    const totalAmount = sum;

    let roomAmountSum = 0;
    data.map((user) => {
      roomAmountSum = roomAmountSum + parseInt(user.roomAmount);
    });
    const totalRoomAmountSum = roomAmountSum;

    const totalTshirtAmountSum = tshirt?.yes * 300;

    return NextResponse.json({
      success: true,
      message: "All Stats",
      data: {
        accomodation,
        totalAccomodation,
        tshirt,
        totalTshirtDetails,
        idCardAllocation,
        collegeParticipation: collegeData,
        totalAmount,
        totalRoomAmountSum,
        totalTshirtAmountSum,
        allParticipants,
      },
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to gett all stats",
    });
  }
}
