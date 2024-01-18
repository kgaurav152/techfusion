import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  }, 
  participant: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
});
 
const Result = mongoose.models.Result || mongoose.model("Result", ResultSchema);

export default Result;
