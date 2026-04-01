import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";
import CalendarClient from "./CalendarClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CalendarPage() {
  await connectDB();
  const events = await Event.find()
    .populate("meetingDetails.hostTeacher", "name subject")
    .sort({ startDate: 1, endDate: 1, createdAt: -1 })
    .lean();

  return <CalendarClient events={JSON.parse(JSON.stringify(events))} />;
}
