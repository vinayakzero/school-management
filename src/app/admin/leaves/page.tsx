import connectDB from "@/lib/mongodb";
import Leave from "@/models/Leave";
import Teacher from "@/models/Teacher";
import LeaveClient from "./LeaveClient";

export const dynamic = "force-dynamic";

export default async function LeavesPage() {
  await connectDB();
  
  // Actually mongoose needs to know the models to populate refPath
  // But since we only have "Teacher" right now, we can ensure Teacher is loaded
  await Teacher.findOne();

  const leavesRaw = await Leave.find()
    .populate("applicantId", "name employeeCode")
    .sort({ appliedOn: -1 })
    .lean();

  const leaves = leavesRaw.map((l: any) => ({
    _id: l._id.toString(),
    applicantType: l.applicantType,
    applicant: l.applicantId ? { name: l.applicantId.name, employeeCode: l.applicantId.employeeCode } : null,
    leaveType: l.leaveType,
    fromDate: l.fromDate,
    toDate: l.toDate,
    totalDays: l.totalDays,
    status: l.status,
    appliedOn: l.appliedOn,
  }));

  return <LeaveClient leaves={leaves} />;
}
