import mongoose from "mongoose";
import fs from "fs";
import path from "path";

async function test() {
  console.log(">>> DIAGNOSTIC START <<<");
  let uri = process.env.MONGODB_URI;
  if (!uri) {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8");
      const match = content.match(/^MONGODB_URI=(.*)$/m);
      if (match) uri = match[1].trim();
    }
  }
  
  if (!uri) {
    console.error("No MONGODB_URI found");
    process.exit(1);
  }
  
  console.log("Connecting to:", uri.replace(/:([^@]+)@/, ":****@"));
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected successfully!");
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    await mongoose.disconnect();
    console.log("Disconnected.");
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

test();
