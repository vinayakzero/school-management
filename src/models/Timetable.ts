import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITimetable extends Document {
  classId: mongoose.Types.ObjectId;
  grade: string;
  section: string;
  day: string;
  periodNumber: number;
  startTime: string;
  endTime: string;
  subjectId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
  roomNumber?: string;
  periodType: "Theory" | "Practical" | "Break" | "Activity";
  academicSession: string;
  createdAt: Date;
  updatedAt: Date;
}

const TimetableSchema = new Schema<ITimetable>(
  {
    classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    grade: { type: String, required: true },
    section: { type: String, required: true },
    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      required: true,
    },
    periodNumber: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
    roomNumber: { type: String },
    periodType: {
      type: String,
      enum: ["Theory", "Practical", "Break", "Activity"],
      required: true,
      default: "Theory",
    },
    academicSession: { type: String, required: true },
  },
  { timestamps: true }
);

// Indexes to speed up queries and ensure uniqueness per class/day/period combination
TimetableSchema.index({ classId: 1, day: 1, periodNumber: 1 }, { unique: true });
TimetableSchema.index({ teacherId: 1, day: 1, periodNumber: 1 }, { unique: true }); // A teacher cannot be in two classes at the same time

const Timetable: Model<ITimetable> = mongoose.models.Timetable || mongoose.model<ITimetable>("Timetable", TimetableSchema);

export default Timetable;
