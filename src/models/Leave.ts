import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILeave extends Document {
  applicantType: "Teacher" | "Staff"; // Can be expanded later
  applicantId: mongoose.Types.ObjectId;
  leaveType: "Sick" | "Casual" | "Earned" | "Maternity" | "Other";
  fromDate: Date;
  toDate: Date;
  totalDays: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  approvedBy?: mongoose.Types.ObjectId;
  approvalNote?: string;
  appliedOn: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LeaveSchema = new Schema<ILeave>(
  {
    applicantType: { type: String, enum: ["Teacher", "Staff"], required: true, default: "Teacher" },
    applicantId: { type: Schema.Types.ObjectId, refPath: "applicantType", required: true },
    leaveType: {
      type: String,
      enum: ["Sick", "Casual", "Earned", "Maternity", "Other"],
      required: true,
    },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    totalDays: { type: Number, required: true, min: 0.5 },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      required: true,
      default: "Pending",
    },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    approvalNote: { type: String },
    appliedOn: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Leave: Model<ILeave> = mongoose.models.Leave || mongoose.model<ILeave>("Leave", LeaveSchema);

export default Leave;
