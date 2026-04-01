import connectDB from "@/lib/mongodb";
import Teacher from "@/models/Teacher";
import EventForm from "../EventForm";

export const dynamic = "force-dynamic";

export default async function NewCalendarEventPage() {
  await connectDB();
  const teachers = await Teacher.find({ status: { $in: ["Active", "On Leave"] } }).select("name subject _id").sort({ name: 1 }).lean();

  return <EventForm teachers={JSON.parse(JSON.stringify(teachers))} />;
}
