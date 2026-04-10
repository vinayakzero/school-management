import mongoose, { Schema, Document, Model } from "mongoose";

export type UserRole = "super_admin" | "admin" | "accountant" | "teacher" | "parent";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  linkedId?: mongoose.Types.ObjectId;
  status: "Active" | "Inactive";
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["super_admin", "admin", "accountant", "teacher", "parent"],
      required: true,
      default: "admin",
    },
    linkedId: { type: Schema.Types.ObjectId, default: null },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
