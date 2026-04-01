import mongoose from "mongoose";
import Exam from "../src/models/Exam";
import Event from "../src/models/Event";
import { syncExamEvent } from "../src/lib/calendar";
import fs from "fs";
import path from "path";

let DB_CONNECTION = process.env.DB_CONNECTION || process.env.MONGODB_URI;

if (!DB_CONNECTION) {
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf8");
      const match = envContent.match(/^(DB_CONNECTION|MONGODB_URI)=(.*)$/m);
      if (match) {
        process.env.DB_CONNECTION = match[2].trim();
        DB_CONNECTION = process.env.DB_CONNECTION;
      }
    }
  } catch (e) {
    // ignore
  }
}

if (!DB_CONNECTION) {
  throw new Error("DB_CONNECTION (preferred) or MONGODB_URI is required in .env.local or shell.");
}

const connectionString: string = DB_CONNECTION;

async function run() {
  try {
    console.log("Connecting to MongoDB for exam sync...");
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Connected successfully.");

    const exams = await Exam.find().select("_id").lean();
    let synced = 0;

    for (const exam of exams) {
      await syncExamEvent(exam._id.toString());
      synced += 1;
    }

    const totalExamEvents = await Event.countDocuments({ type: "Exam", linkedExam: { $ne: null } });
    console.log(`Synced ${synced} exam events.`);
    console.log(`Calendar now has ${totalExamEvents} linked exam events.`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to sync exam events:", error);
    process.exit(1);
  }
}

run();
