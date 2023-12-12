import mongoose from "mongoose";

const ParticipationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  student: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
});
 
const Participation = mongoose.models.Participations || mongoose.model("Participations", ParticipationSchema);

export default Participation;
