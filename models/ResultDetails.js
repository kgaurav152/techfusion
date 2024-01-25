import mongoose from "mongoose";

const ResultDetailsSchema = new mongoose.Schema({
  participant:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participation",
    },
  rank :{
    type:String,
    required:true,
  },
  score :{
    type:String, 
  },
  description :{
    type:String, 
  }
});
 
const ResultDetail = mongoose.models.ResultDetail || mongoose.model("ResultDetail", ResultDetailsSchema);

export default ResultDetail;
