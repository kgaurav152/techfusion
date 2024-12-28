import { connect } from "@/config/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import SchoolStudent from "@/models/SchoolStudent";
import SchoolEvent from "@/models/SchoolEvent";
import SchoolParticipation from "@/models/SchoolParticipation";

const technical_max_limit = 5;
const cultural_max_limit = 5;

function alreadyRegistered(schoolStudent, schoolEvent_id) {
  const technical = schoolStudent.technical.find(
    (item) => item.schoolEvent.toString() === schoolEvent_id.toString()
  );
  const cultural = schoolStudent.cultural.find(
    (item) => item.schoolEvent.toString() === schoolEvent_id.toString()
  );

  return technical || cultural;
}

function checkPaymentPending(schoolStudent) {
  return schoolStudent.isPaymentConfirmed === false;
}

function checkTechnicalLimit(schoolStudent, schoolEvent) {
  return (
    schoolEvent.eventType === "Technical" &&
    schoolStudent.technical.length >= technical_max_limit
  );
}

function checkCulturalLimit(schoolStudent, schoolEvent) {
  return (
    schoolEvent.eventType === "Cultural" &&
    schoolStudent.cultural.length == cultural_max_limit
  );
}

export async function POST(req) {
  const { token, schoolEvent_id, team_lead, team_name, team_members } =
    await req.json();
  connect();
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
        message: "This is protected route for Admin and hospitality access",
      });
    }

    const leadSchoolStudent = await SchoolStudent.findOne({
      festId: team_lead.toUpperCase(),
    })
      .populate("technical")
      .populate("cultural");

    if (!leadSchoolStudent) {
      return NextResponse.json({
        success: false,
        message: "Invalid Team Leader's TechFusion Id",
      });
    }

    const schoolEvent = await SchoolEvent.findById(schoolEvent_id);

    if (!schoolEvent) {
      return NextResponse.json({
        success: false,
        message: "School Event is Not Found, Might be it is deleted",
      });
    }

    if (!team_name) {
      return NextResponse.json({
        success: false,
        message: "Team name is Required",
      });
    }

    if (leadSchoolStudent) {
      if (checkPaymentPending(leadSchoolStudent)) {
        return NextResponse.json({
          success: false,
          message: `Your Payment status is Pending right now`,
        });
      }
      if (checkTechnicalLimit(leadSchoolStudent, schoolEvent)) {
        return NextResponse.json({
          success: false,
          message: `You already enrolled in ${technical_max_limit} Technical School Events`,
        });
      }
      if (checkCulturalLimit(leadSchoolStudent, schoolEvent)) {
        return NextResponse.json({
          success: false,
          message: `You already enrolled in ${cultural_max_limit} cultural School Events`,
        });
      }
      if (alreadyRegistered(leadSchoolStudent, schoolEvent._id)) {
        return NextResponse.json({
          success: false,
          message: `Team Leader is already registered in this School Event`,
        });
      }
    }

    if (schoolEvent.max === 1) {
      const newSchoolParticipation = await SchoolParticipation.create({
        schoolEvent: schoolEvent_id,
        teamName: team_name,
        participants: [leadSchoolStudent._id],
      });
      if (schoolEvent.eventType === "Cultural") {
        await SchoolStudent.findByIdAndUpdate(leadSchoolStudent._id, {
          $push: { cultural: newSchoolParticipation._id },
        });
      } else if (schoolEvent.eventType === "Technical") {
        await SchoolStudent.findByIdAndUpdate(leadSchoolStudent._id, {
          $push: { technical: newSchoolParticipation._id },
        });
      }
      return NextResponse.json({
        success: true,
        message: "Registered for School Event Successfully!",
        data: newSchoolParticipation,
      });
    }

    let schoolStudentArray = [leadSchoolStudent._id];

    for (let i = 0; i < team_members.length; i++) {
      const member = await SchoolStudent.findOne({
        festId: team_members[i].festId.toUpperCase(),
      })
        .populate("technical")
        .populate("cultural");

      if (!member) {
        return NextResponse.json({
          success: false,
          message: `Team Member with ${member?.festId} is Not Found, Pease Verify!!`,
        });
      }
      if (checkPaymentPending(member)) {
        return NextResponse.json({
          success: false,
          message: `${member.festId} - ${member.name} Payment status is Pending right now`,
        });
      }

      if (checkTechnicalLimit(member, schoolEvent)) {
        return NextResponse.json({
          success: false,
          message: `${member.festId} - ${member.name} already enrolled in ${technical_max_limit} Technical events`,
        });
      } else if (checkCulturalLimit(member, schoolEvent)) {
        return NextResponse.json({
          success: false,
          message: `${member.festId} - ${member.name} already enrolled in ${cultural_max_limit} Cultural events`,
        });
      }
      if (alreadyRegistered(member, schoolEvent._id)) {
        return NextResponse.json({
          success: false,
          message: `${member.festId} - ${member.name} already registered in this School Event`,
        });
      }
      if (
        schoolStudentArray.find(
          (item) => item.toString() === member._id.toString()
        )
      ) {
        return NextResponse.json({
          success: false,
          message: `Two Members techfest ID is same Please verify`,
        });
      }
      schoolStudentArray.push(member._id);
    }

    if (
      schoolStudentArray.length < schoolEvent?.min ||
      schoolStudentArray.length > schoolEvent?.max
    ) {
      return NextResponse.json({
        success: false,
        message: `This school event requires a minimum of ${schoolEvent.min} participants and can accommodate up to a maximum of ${schoolEvent.max} participants.`,
      });
    }

    const newSchoolParticipation = await SchoolParticipation.create({
      schoolEvent: schoolEvent._id,
      teamName: team_name,
      participants: schoolStudentArray,
    });

    if (schoolEvent.eventType === "Technical") {
      for (let i = 0; i < schoolStudentArray.length; i++) {
        await SchoolStudent.findByIdAndUpdate(schoolStudentArray[i], {
          $push: { technical: newSchoolParticipation._id },
        });
      }
    } else if (schoolEvent.eventType === "Cultural") {
      for (let i = 0; i < schoolStudentArray.length; i++) {
        await SchoolStudent.findByIdAndUpdate(schoolStudentArray[i], {
          $push: { cultural: newSchoolParticipation._id },
        });
      }
    }
    return NextResponse.json({
      success: true,
      message: "Registered for School Event Successfully!",
      data: newSchoolParticipation,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Create School Participation",
    });
  }
}
