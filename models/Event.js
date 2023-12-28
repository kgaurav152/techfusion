import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    trim: true,
  },
  eventType:{
    type:String,
    required: true,
  },
  eventId:{
    type:String,
    required: true,
  },
  participationMode:{
    type:String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  ruleBook:{
    type:String,
    required: true,
  },
  posterUrl:{
    type:String,
    required: true,
  }
});

const Event = mongoose.models.Events || mongoose.model("Events", EventSchema);

export default Event;
