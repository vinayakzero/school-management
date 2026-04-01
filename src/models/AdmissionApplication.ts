import mongoose, { Document, Model, Schema } from "mongoose";
import {
  ADMISSION_APPLICATION_STATUSES,
  ADMISSION_DOCUMENT_STATUSES,
  type AdmissionApplicationStatus,
  type AdmissionChecklistItem,
  type AdmissionDocumentStatus,
} from "@/lib/admissions";

export interface IAdmissionApplication extends Document {
  inquiry: mongoose.Types.ObjectId;
  applicationNumber: string;
  academicYear: string;
  status: AdmissionApplicationStatus;
  parentName: string;
  studentName: string;
  studentGradeInterest: string;
  email: string;
  phone: string;
  applicationNotes?: string;
  counselorNotes?: string;
  reviewDate?: Date | null;
  documentChecklist: AdmissionChecklistItem[];
  createdAt: Date;
  updatedAt: Date;
}

const AdmissionChecklistItemSchema = new Schema<AdmissionChecklistItem>(
  {
    key: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: [...ADMISSION_DOCUMENT_STATUSES],
      default: "Pending",
    },
    note: { type: String, default: "" },
  },
  { _id: false }
);

const AdmissionApplicationSchema = new Schema<IAdmissionApplication>(
  {
    inquiry: {
      type: Schema.Types.ObjectId,
      ref: "AdmissionInquiry",
      required: true,
      unique: true,
    },
    applicationNumber: { type: String, required: true, trim: true, unique: true },
    academicYear: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: [...ADMISSION_APPLICATION_STATUSES],
      default: "Draft",
    },
    parentName: { type: String, required: true, trim: true },
    studentName: { type: String, required: true, trim: true },
    studentGradeInterest: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    applicationNotes: { type: String, default: "" },
    counselorNotes: { type: String, default: "" },
    reviewDate: { type: Date, default: null },
    documentChecklist: { type: [AdmissionChecklistItemSchema], default: [] },
  },
  { timestamps: true }
);

AdmissionApplicationSchema.index({ status: 1, createdAt: -1 });
AdmissionApplicationSchema.index({ academicYear: 1, createdAt: -1 });

const AdmissionApplication: Model<IAdmissionApplication> =
  mongoose.models.AdmissionApplication ||
  mongoose.model<IAdmissionApplication>("AdmissionApplication", AdmissionApplicationSchema);

export default AdmissionApplication;
