import mongoose from "mongoose";

const SchoolStudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    studentClass: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      trim: true,
    },
    rollNo: {
      type: Number,
      required: true,
      unique: true,
    },
    school: {
      type: String,
      required: true,
      trim: true,
    },
    parentPhoneNumber: {
      type: String,
      match: /^[0-9]{10}$/,
      trim: true,
    },
    festId: {
      type: String,
      required: true,
      trim: true,
    },
    isPaymentConfirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "other"],
    },
    registrationFee: {
      type: String,
      required: true,
    },
    paymentReceivedBy: {
      type: String,
      // required: true,
    },
    idCardAllocation: {
      type: Boolean,
      default: false,
    },
    technical: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolParticipation",
      },
    ],
    cultural: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolParticipation",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SchoolStudent =
  mongoose.models.SchoolStudent ||
  mongoose.model("SchoolStudent", SchoolStudentSchema);

export default SchoolStudent;
