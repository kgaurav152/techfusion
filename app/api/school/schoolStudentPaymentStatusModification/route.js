import { connect } from "@/config/dbconfig";
import User from "@/models/User";
import SchoolStudent from "@/models/SchoolStudent";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export async function POST(req) {
  const { token, schoolStudentId, isPaymentConfirmed, paymentReceivedBy } =
    await req.json();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);
    if (
      user?.userType !== "admin" &&
      user?.userType !== "hospitality" &&
      user?.userType !== "schoolfacilitator"
    ) {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin and Hospitality access",
      });
    }
    let formattedPaymentReceivedBy;
    if (isPaymentConfirmed === false) {
      formattedPaymentReceivedBy = "";
    } else {
      formattedPaymentReceivedBy = paymentReceivedBy;
    }

    const data = await SchoolStudent.findByIdAndUpdate(schoolStudentId, {
      isPaymentConfirmed,
      paymentReceivedBy: formattedPaymentReceivedBy,
    });

    return NextResponse.json({
      success: true,
      message: "Payment status updated",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Update payment Status",
    });
  }
}
