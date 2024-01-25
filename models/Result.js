import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  }, 
  round :{
    type:String,
    required:true,
  },
  result: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResultDetail",
    }
  ],
});
 
const Result = mongoose.models.Result || mongoose.model("Result", ResultSchema);

export default Result;
