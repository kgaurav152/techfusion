import mongoose from "mongoose";

const CoordinatorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "other"],
  },
  linkedin: {
    type: String,
    required: true,
  },
  instaId: {
    type: String,
    required: true,
  },
  pictureUrl: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const Coordinator =
  mongoose.models.Coordinator ||
  mongoose.model("Coordinator", CoordinatorSchema);

export default Coordinator;
