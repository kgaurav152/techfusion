import mongoose from "mongoose";

const CampusAmbassadorSchema = new mongoose.Schema({
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
  linkedin: {
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
  batch: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  caId: {
    type: String,
    required: true,
    trim: true,
  },
});

const CampusAmbassador =
  mongoose.models.CampusAmbassador ||
  mongoose.model("CampusAmbassador", CampusAmbassadorSchema);

export default CampusAmbassador;
