import mongoose from "mongoose";

const ParticipationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  teamName: {
    type:String,
    required:true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
});
 
const Participation = mongoose.models.Participation || mongoose.model("Participation", ParticipationSchema);

export default Participation;
