import connectDB from "@/lib/mongodb";
import Leave from "@/models/Leave";
import Teacher from "@/models/Teacher";
import User from "@/models/User";
import { notFound } from "next/navigation";
import LeaveProcessClient from "./LeaveProcessClient";

export default async function LeaveProcessPage({ params }: { params: { id: string } }) {
  await connectDB();
  
  // Ensure models are loaded for populate
  await Teacher.findOne();

  const leaveRaw = await Leave.findById(params.id)
    .populate("applicantId", "name employeeCode department")
    .populate("approvedBy", "name")
    .lean();

  if (!leaveRaw) notFound();

  const leave = {
    _id: leaveRaw._id.toString(),
    applicantType: leaveRaw.applicantType,
    applicant: leaveRaw.applicantId ? { 
      name: leaveRaw.applicantId.name, 
      employeeCode: leaveRaw.applicantId.employeeCode,
      department: leaveRaw.applicantId.department 
    } : null,
    leaveType: leaveRaw.leaveType,
    fromDate: leaveRaw.fromDate.toISOString(),
    toDate: leaveRaw.toDate.toISOString(),
    totalDays: leaveRaw.totalDays,
    reason: leaveRaw.reason,
    status: leaveRaw.status,
    approvalNote: leaveRaw.approvalNote,
    approvedBy: leaveRaw.approvedBy ? leaveRaw.approvedBy.name : null,
    appliedOn: leaveRaw.appliedOn.toISOString(),
  };

  return <LeaveProcessClient leave={leave} />;
}
