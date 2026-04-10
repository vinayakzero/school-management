import connectDB from "@/lib/mongodb";
import ClassModel from "@/models/Class";
import Timetable from "@/models/Timetable";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Printer } from "lucide-react";
import TimetableGridClient from "./TimetableGridClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ClassTimetablePage({ params }: { params: { classId: string } }) {
  await connectDB();
  
  const cls = await ClassModel.findById(params.classId).populate("classTeacher", "name").lean();
  if (!cls) notFound();

  const entriesRaw = await Timetable.find({ classId: params.classId })
    .populate("subjectId", "name code")
    .populate("teacherId", "name")
    .sort({ periodNumber: 1 })
    .lean();
    
  const entries = entriesRaw.map((e: any) => ({
    _id: e._id.toString(),
    day: e.day,
    periodNumber: e.periodNumber,
    startTime: e.startTime,
    endTime: e.endTime,
    periodType: e.periodType,
    roomNumber: e.roomNumber,
    subject: e.subjectId ? { _id: e.subjectId._id.toString(), name: e.subjectId.name, code: e.subjectId.code } : null,
    teacher: e.teacherId ? { _id: e.teacherId._id.toString(), name: e.teacherId.name } : null,
  }));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Timetable Management"
        title={`Grade ${cls.grade} - Section ${cls.section}`}
        description={`Class Teacher: ${(cls.classTeacher as any)?.name || "Not Assigned"} | Total Periods: ${entries.length}`}
      >
        <div className="flex items-center gap-3">
          <Link href={`/admin/timetable/new?classId=${params.classId}`} className={buttonVariants({ variant: "default" })}>
            <Plus size={18} className="mr-2" />
            Add Period
          </Link>
        </div>
      </AdminPageHeader>

      <AdminSectionCard
        title="Weekly Schedule"
        description="Hover over an entry to edit or delete it. Empty slots have a quick-add button."
      >
        <div className="p-1">
          <TimetableGridClient entries={entries} classId={params.classId} />
        </div>
      </AdminSectionCard>
    </div>
  );
}
