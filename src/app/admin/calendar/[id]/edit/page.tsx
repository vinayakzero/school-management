import { notFound } from "next/navigation";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";
import Teacher from "@/models/Teacher";
import EventForm from "../../EventForm";

export const dynamic = "force-dynamic";

export default async function EditCalendarEventPage({ params }: { params: { id: string } }) {
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound();
  }

  await connectDB();

  const [event, teachers] = await Promise.all([
    Event.findById(params.id).populate("meetingDetails.hostTeacher", "name subject _id").lean(),
    Teacher.find({ status: { $in: ["Active", "On Leave"] } }).select("name subject _id").sort({ name: 1 }).lean(),
  ]);

  if (!event) {
    notFound();
  }

  return <EventForm event={JSON.parse(JSON.stringify(event))} teachers={JSON.parse(JSON.stringify(teachers))} />;
}
