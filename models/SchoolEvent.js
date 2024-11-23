import mongoose from "mongoose";

const SchoolEventSchema = new mongoose.Schema({
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
});

const SchoolEvent =
  mongoose.models.SchoolEvent ||
  mongoose.model("SchoolEvent", SchoolEventSchema);

export default SchoolEvent;
