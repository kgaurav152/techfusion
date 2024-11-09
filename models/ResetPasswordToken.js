import mongoose from "mongoose";

const ResetPasswordTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

ResetPasswordTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // MongoDB TTL index

const ResetPasswordToken =
  mongoose.models.ResetPasswordToken ||
  mongoose.model("ResetPasswordToken", ResetPasswordTokenSchema);

export default ResetPasswordToken;
