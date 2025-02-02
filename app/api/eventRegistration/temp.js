import { connect } from "@/config/dbconfig";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Event from "@/models/Event";
import Participation from "@/models/Participation";
import { previousDay } from "date-fns";

const technical_max_limit = 20;
const cultural_max_limit = 20;

function alreadyRegistered(user,event_id){
  const technical = user.technical.find((item) => item.event.toString() === event_id.toString())
  const cultural = user.cultural.find((item) => item.event.toString() === event_id.toString());

   return technical || cultural;


}
export async function POST(req) {
  const {
    token,
    event_id,
    team_name,
    team_lead,
    team_member_1,
    team_member_2,
    team_member_3,
  } = await req.json();
  connect();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID).populate("technical").populate("cultural");
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User is Not Logged In",
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
    if (user) {
      if (user.status == "pending") {
        return NextResponse.json({
          success: false,
          message: `Your Payment status is Pending right now`,
        });
      }
      if (
        event.eventType === "Technical" &&
        user.technical.length >= technical_max_limit
      ) {
        return NextResponse.json({
          success: false,
          message: `You already enrolled in ${technical_max_limit} Technical events`,
        });
      }
      if (
        event.eventType === "Cultural" &&
        user.cultural.length == cultural_max_limit
      ) {
        return NextResponse.json({
          success: false,
          message: `You already enrolled in ${cultural_max_limit} cultural events`,
        });
      }

      if(alreadyRegistered(user,event._id)){
        return NextResponse.json({
          success: false,
          message: `You already registered in this event`, 
        });
      }

    }

    if (event.participationMode == "Individual") {
      const newParticipation = await Participation.create({
        event: event_id,
        teamName: team_name,
        participants: [user._id],
      });
      if (event.eventType === "Cultural") {
        await User.findByIdAndUpdate(user._id, {
          $push: { cultural: newParticipation._id },
        });
        return NextResponse.json({
          success: true,
          message: "Registered for Event Successfully!",
          data: newParticipation,
        });
      }
      if (event.eventType === "Technical") {
        await User.findByIdAndUpdate(user._id, {
          $push: { technical: newParticipation._id },
        });
        return NextResponse.json({
          success: true,
          message: "Registered for Event Successfully!",
          data: newParticipation,
        });
      }
    }
    let user1 = null;
    let user2 = null;
    let user3 = null;
    let userArray = [user._id];
    if (team_member_1) {
      user1 = await User.findOne({ festId: team_member_1.toUpperCase() }).populate("technical").populate("cultural");
      if (!user1) {
        return NextResponse.json({
          success: false,
          message: `Team Member 1 Fest Id is Not Found, Pease Verify!!`,
        });
      }
      if (user1.status == "pending") {
        return NextResponse.json({
          success: false,
          message: `${user1.festId} Payment status is Pending right now`,
        });
      }
      if (
        event.eventType === "Technical" &&
        user1.technical.length >= technical_max_limit
      ) {
        return NextResponse.json({
          success: false,
          message: `${user1.festId} already enrolled in ${technical_max_limit} Technical events`,
        });
      } else if (
        event.eventType === "Cultural" &&
        user1.cultural.length == cultural_max_limit
      ) {
        return NextResponse.json({
          success: false,
          message: `${user1.festId} already enrolled in ${cultural_max_limit} Cultural events`,
        });
      }
      if(alreadyRegistered(user1,event._id)){
        return NextResponse.json({
          success: false,
          message: `${user1.festId} already registered in this event`, 
        });
      }
      if(userArray.find((item)=> item.toString() === user1._id.toString())){
        return NextResponse.json({
          success: false,
          message: `Two Member techfest ID is same Please verify`,
        });
      }
      userArray.push(user1._id);
    }
    if (team_member_2) {
      user2 = await User.findOne({ festId: team_member_2.toUpperCase() }).populate("technical").populate("cultural");
      if (!user2) {
        return NextResponse.json({
          success: false,
          message: `Team Member 2 Fest Id is Not Found, Please Verify !!`,
        });
      }
      if (user2.status == "pending") {
        return NextResponse.json({
          success: false,
          message: `${user2.festId} Payment status is Pending right now`,
        });
      }
      if (
        event.eventType === "Technical" &&
        user2.technical.length >= technical_max_limit
      ) {
        return NextResponse.json({
          success: false,
          message: `${user2.festId} already enrolled in ${technical_max_limit} technical events`,
        });
      } else if (
        event.eventType === "Cultural" &&
        user2.cultural.length == cultural_max_limit
      ) {
        return NextResponse.json({
          success: false,
          message: `${user2.festId} already enrolled in ${cultural_max_limit} cultural events`,
        });
      }
      if(alreadyRegistered(user2,event._id)){
        return NextResponse.json({
          success: false,
          message: `${user2.festId} already registered in this event`, 
        });
      }
      if(userArray.find((item)=> item.toString() === user2._id.toString())){
        return NextResponse.json({
          success: false,
          message: `Two Member techfest ID is same Please verify`,
        });
      }
      userArray.push(user2._id);
    }
    if (team_member_3) {
      user3 = await User.findOne({ festId: team_member_3.toUpperCase() }).populate("technical").populate("cultural");
      if (!user3) {
        return NextResponse.json({
          success: false,
          message: `Team Member 3 Fest Id is Not Found, Please Verify!!`,
        });
      }
      if (user3.status == "pending") {
        return NextResponse.json({
          success: false,
          message: `${user3.festId} Payment status is Pending right now`,
        });
      }
      if (
        event.eventType === "Technical" &&
        user3.technical.length >= technical_max_limit
      ) {
        return NextResponse.json({
          success: false,
          message: `${user3.festId} already enrolled in ${technical_max_limit} technical events`,
        });
      } else if (
        event.eventType === "Cultural" &&
        user3.cultural.length == cultural_max_limit
      ) {
        return NextResponse.json({
          success: false,
          message: `${user3.festId} already participated in ${cultural_max_limit} cultural events`,
        });
      }
      if(alreadyRegistered(user3,event._id)){
        return NextResponse.json({
          success: false,
          message: `${user3.festId} already registered in this event`, 
        });
      }
      if(userArray.find((item)=> item.toString() === user3._id.toString())){
        return NextResponse.json({
          success: false,
          message: `Two Member techfest ID is same Please verify`,
        });
      }
      userArray.push(user3._id);
    }

    if (userArray.length < 2) {
      return NextResponse.json({
        success: false,
        message: `This is Group event minimum 2 Participant Required`,
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
