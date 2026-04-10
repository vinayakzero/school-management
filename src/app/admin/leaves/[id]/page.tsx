import connectDB from "@/lib/mongodb";
import Leave from "@/models/Leave";
import Teacher from "@/models/Teacher";
import { notFound } from "next/navigation";
import LeaveProcessClient from "./LeaveProcessClient";

type PopulatedApplicant = {
  name?: string;
  employeeCode?: string;
  department?: string;
};

type PopulatedApprover = {
  name?: string;
};

export default async function LeaveProcessPage({ params }: { params: { id: string } }) {
  await connectDB();
  
  // Ensure models are loaded for populate
  await Teacher.findOne();

  const leaveRaw = await Leave.findById(params.id)
    .populate("applicantId", "name employeeCode department")
    .populate("approvedBy", "name")
    .lean();

  if (!leaveRaw) notFound();

  const applicant = leaveRaw.applicantId as PopulatedApplicant | null;
  const approvedBy = leaveRaw.approvedBy as PopulatedApprover | null;

  const leave = {
    _id: leaveRaw._id.toString(),
    applicantType: leaveRaw.applicantType,
    applicant: applicant
      ? {
          name: applicant.name || "Unknown applicant",
          employeeCode: applicant.employeeCode || "",
          department: applicant.department || "",
        }
      : null,
    leaveType: leaveRaw.leaveType,
    fromDate: leaveRaw.fromDate.toISOString(),
    toDate: leaveRaw.toDate.toISOString(),
    totalDays: leaveRaw.totalDays,
    reason: leaveRaw.reason,
    status: leaveRaw.status,
    approvalNote: leaveRaw.approvalNote,
    approvedBy: approvedBy?.name || null,
    appliedOn: leaveRaw.appliedOn.toISOString(),
    updatedAt: leaveRaw.updatedAt.toISOString(),
  };

  return <LeaveProcessClient leave={leave} />;
}
