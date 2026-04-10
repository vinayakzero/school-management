import mongoose, { Document, Model, Schema } from "mongoose";
import { ADMISSION_REQUEST_TYPES, ADMISSION_STATUSES, type AdmissionRequestType, type AdmissionSourcePage, type AdmissionStatus } from "@/lib/admissions";

export interface IAdmissionInquiry extends Document {
  parentName: string;
  studentName: string;
  studentGradeInterest: string;
  email: string;
  phone: string;
  message?: string;
  requestType: AdmissionRequestType;
  status: AdmissionStatus;
  sourcePage: AdmissionSourcePage;
  sourcePath: string;
  preferredVisitDate?: Date | null;
  preferredVisitTime?: string;
  followUpDate?: Date | null;
  internalNotes?: string;
  lastContactedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const AdmissionInquirySchema = new Schema<IAdmissionInquiry>(
  {
    parentName: { type: String, required: true, trim: true },
    studentName: { type: String, required: true, trim: true },
    studentGradeInterest: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, default: "", trim: true },
    requestType: {
      type: String,
      enum: [...ADMISSION_REQUEST_TYPES],
      required: true,
    },
    status: {
      type: String,
      enum: [...ADMISSION_STATUSES],
      default: "New",
    },
    sourcePage: {
      type: String,
      enum: ["admissions", "campus", "admission", "inquiry"],
      required: true,
    },
    sourcePath: { type: String, required: true, default: "/admissions" },
    preferredVisitDate: { type: Date, default: null },
    preferredVisitTime: { type: String, default: "" },
    followUpDate: { type: Date, default: null },
    internalNotes: { type: String, default: "" },
    lastContactedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

AdmissionInquirySchema.index({ status: 1, createdAt: -1 });
AdmissionInquirySchema.index({ requestType: 1, createdAt: -1 });
AdmissionInquirySchema.index({ email: 1, createdAt: -1 });

const AdmissionInquiry: Model<IAdmissionInquiry> =
  mongoose.models.AdmissionInquiry || mongoose.model<IAdmissionInquiry>("AdmissionInquiry", AdmissionInquirySchema);

export default AdmissionInquiry;
