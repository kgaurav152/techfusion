import mongoose from "mongoose";

const SchoolParticipationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SchoolEvent",
  },
  teamName: {
    type: String,
    required: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolStudent",
    },
  ],
});

const SchoolParticipation =
  mongoose.models.SchoolParticipation ||
  mongoose.model("SchoolParticipation", SchoolParticipationSchema);

export default SchoolParticipation;
