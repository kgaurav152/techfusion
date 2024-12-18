import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  ruleBook: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
    required: true,
    min: [1, "Minimum participants must be at least 1"],
  },
  max: {
    type: Number,
    required: true,
    min: [1, "Maximum participants must be at least 1"],
    validate: {
      validator: function (value) {
        return value >= this.min;
      },
      message:
        "Maximum participants should be equal to or greater than minimum participants",
    },
  },
  eventDateTime: {
    type: Date,
    required: true,
  },
  eventRegistrationDateTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value < this.eventDateTime;
      },
      message: "Event Registration Date must be before the Event Date",
    },
  },
  coordinators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coordinator",
    },
  ],
});

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
