import mongoose, { Schema, Document, Model } from "mongoose";

export type StaffAttendanceStatus = "Present" | "Absent" | "Late" | "Half Day" | "On Leave";

export interface IStaffAttendance extends Document {
  teacherId: mongoose.Types.ObjectId;
  date: Date;
  status: StaffAttendanceStatus;
  inTime?: string;
  outTime?: string;
  note?: string;
  markedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const StaffAttendanceSchema = new Schema<IStaffAttendance>(
  {
    teacherId: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Present", "Absent", "Late", "Half Day", "On Leave"],
      required: true,
      default: "Present",
    },
    inTime: { type: String },
    outTime: { type: String },
    note: { type: String },
    markedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// A teacher can only have one attendance record per day
StaffAttendanceSchema.index({ teacherId: 1, date: 1 }, { unique: true });

const StaffAttendance: Model<IStaffAttendance> =
  mongoose.models.StaffAttendance || mongoose.model<IStaffAttendance>("StaffAttendance", StaffAttendanceSchema);

export default StaffAttendance;
