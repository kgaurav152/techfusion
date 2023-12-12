import mongoose from "mongoose";

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const Event = mongoose.models.Events || mongoose.model("Events", EventSchema);

export default Event;
