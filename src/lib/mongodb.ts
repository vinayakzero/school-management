import mongoose from "mongoose";

// Pre-register models to prevent "MissingSchemaError" in Next.js
import "@/models/Student";
import "@/models/Teacher";
import "@/models/Class";
import "@/models/Subject";
import "@/models/Course";
import "@/models/Syllabus";
import "@/models/Exam";
import "@/models/Result";
import "@/models/Attendance";
import "@/models/Event";
import "@/models/FeeStructure";
import "@/models/Payment";
import "@/models/Setting";
import "@/models/CertificateTemplate";

const DB_CONNECTION = process.env.DB_CONNECTION || "";

if (!DB_CONNECTION) {
  throw new Error(
    "Please define the DB_CONNECTION environment variable inside .env.local"
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DB_CONNECTION, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
