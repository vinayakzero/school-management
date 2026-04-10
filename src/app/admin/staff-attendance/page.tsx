import connectDB from "@/lib/mongodb";
import Teacher from "@/models/Teacher";
import StaffAttendance from "@/models/StaffAttendance";
import StaffAttendanceClient from "./StaffAttendanceClient";

export const dynamic = "force-dynamic";

export default async function StaffAttendancePage({ searchParams }: { searchParams: { date?: string } }) {
  await connectDB();
  
  // Default to today if no date provided
  let targetDate = new Date();
  if (searchParams.date) {
    const parsed = new Date(searchParams.date);
    if (!isNaN(parsed.getTime())) {
      targetDate = parsed;
    }
  }

  // Normalize to UTC start of day for accurate querying
  const startOfDay = new Date(targetDate);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(startOfDay);
  endOfDay.setUTCHours(23, 59, 59, 999);

  // Fetch all active teachers
  const teachersRaw = await Teacher.find({ status: "Active" })
    .sort({ department: 1, name: 1 })
    .lean();

  const teachers = teachersRaw.map((t: any) => ({
    _id: t._id.toString(),
    name: t.name,
    employeeCode: t.employeeCode,
    department: t.department,
    subject: t.subject,
  }));

  // Fetch existing attendance records for the target date
  const recordsRaw = await StaffAttendance.find({
    date: { $gte: startOfDay, $lte: endOfDay }
  }).lean();

  const existingRecords = recordsRaw.map((r: any) => ({
    _id: r._id.toString(),
    teacherId: r.teacherId.toString(),
    status: r.status,
    inTime: r.inTime,
    outTime: r.outTime,
    note: r.note,
  }));

  return (
    <StaffAttendanceClient 
      teachers={teachers} 
      existingRecords={existingRecords}
      currentDateStr={startOfDay.toISOString()}
    />
  );
}
