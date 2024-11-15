import { connect } from "@/config/dbconfig";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Event from "@/models/Event";
import Participation from "@/models/Participation";

const technical_max_limit = 20;
const cultural_max_limit = 20;

function alreadyRegistered(user, event_id) {
  const technical = user.technical.find(
    (item) => item.event.toString() === event_id.toString()
  );
  const cultural = user.cultural.find(
    (item) => item.event.toString() === event_id.toString()
  );

  return technical || cultural;
}

function checkPaymentPending(user) {
  return user.status === "pending";
}

function checkTechnicalLimit(user, event) {
  return (
    event.eventType === "Technical" &&
    user.technical.length >= technical_max_limit
  );
}

function checkCulturalLimit(user, event) {
  return (
    event.eventType === "Cultural" && user.cultural.length == cultural_max_limit
  );
}

export async function POST(req) {
  const { token, event_id, team_lead, team_name, team_members } =
    await req.json();
  connect();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);

    if (user?.userType !== "coordinator") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Coordinator access",
      });
    }

    const leadUser = await User.findOne({
      festId: team_lead.toUpperCase(),
    })
      .populate("technical")
      .populate("cultural");

    if (!leadUser) {
      return NextResponse.json({
        success: false,
        message: "Invalid Team Leader's TechFusion Id",
      });
    }

    const event = await Event.findById(event_id);

    if (!event) {
      return NextResponse.json({
        success: false,
        message: "Event is Not Found, Might be it is deleted",
      });
    }

    if (!team_name) {
      return NextResponse.json({
        success: false,
        message: "Team name is Required",
      });
    }

    if (leadUser) {
      if (checkPaymentPending(leadUser)) {
        return NextResponse.json({
          success: false,
          message: `Your Payment status is Pending right now`,
        });
      }
      if (checkTechnicalLimit(leadUser, event)) {
        return NextResponse.json({
          success: false,
          message: `You already enrolled in ${technical_max_limit} Technical events`,
        });
      }
      if (checkCulturalLimit(leadUser, event)) {
        return NextResponse.json({
          success: false,
          message: `You already enrolled in ${cultural_max_limit} cultural events`,
        });
      }
      if (alreadyRegistered(leadUser, event._id)) {
        return NextResponse.json({
          success: false,
          message: `Team Leader is already registered in this event`,
        });
      }
    }

    if (event.max === 1) {
      const newParticipation = await Participation.create({
        event: event_id,
        teamName: team_name,
        participants: [leadUser._id],
      });
      if (event.eventType === "Cultural") {
        await User.findByIdAndUpdate(leadUser._id, {
          $push: { cultural: newParticipation._id },
        });
      } else if (event.eventType === "Technical") {
        await User.findByIdAndUpdate(leadUser._id, {
          $push: { technical: newParticipation._id },
        });
      }
      return NextResponse.json({
        success: true,
        message: "Registered for Event Successfully!",
        data: newParticipation,
      });
    }

    let userArray = [leadUser._id];

    for (let i = 0; i < team_members.length; i++) {
      const member = await User.findOne({
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

      if (checkTechnicalLimit(member, event)) {
        return NextResponse.json({
          success: false,
          message: `${member.festId} - ${member.name} already enrolled in ${technical_max_limit} Technical events`,
        });
      } else if (checkCulturalLimit(member, event)) {
        return NextResponse.json({
          success: false,
          message: `${member.festId} - ${member.name} already enrolled in ${cultural_max_limit} Cultural events`,
        });
      }
      if (alreadyRegistered(member, event._id)) {
        return NextResponse.json({
          success: false,
          message: `${member.festId} - ${member.name} already registered in this event`,
        });
      }
      if (userArray.find((item) => item.toString() === member._id.toString())) {
        return NextResponse.json({
          success: false,
          message: `Two Members techfest ID is same Please verify`,
        });
      }
      userArray.push(member._id);
    }

    if (userArray.length >= event?.min && userArray.length <= event?.max) {
      return NextResponse.json({
        success: false,
        message: `This event requires a minimum of ${event.min} participants and can accommodate up to a maximum of ${event.max} participants.`,
      });
    }

    const newParticipation = await Participation.create({
      event: event._id,
      teamName: team_name,
      participants: userArray,
    });

    if (event.eventType === "Technical") {
      for (let i = 0; i < userArray.length; i++) {
        await User.findByIdAndUpdate(userArray[i], {
          $push: { technical: newParticipation._id },
        });
      }
    } else if (event.eventType === "Cultural") {
      for (let i = 0; i < userArray.length; i++) {
        await User.findByIdAndUpdate(userArray[i], {
          $push: { cultural: newParticipation._id },
        });
      }
    }
    return NextResponse.json({
      success: true,
      message: "Registered for Event Successfully!",
      data: newParticipation,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Create Participation",
    });
  }
}
