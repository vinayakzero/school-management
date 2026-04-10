import connectDB from "@/lib/mongodb";
import ClassModel from "@/models/Class";
import Subject from "@/models/Subject";
import Teacher from "@/models/Teacher";
import Timetable from "@/models/Timetable";
import TimetableForm from "../../TimetableForm";
import { notFound } from "next/navigation";

export default async function EditTimetablePeriodPage({ params }: { params: { id: string } }) {
  await connectDB();
  
  const entryRaw = await Timetable.findById(params.id).lean();
  if (!entryRaw) notFound();

  const classesRaw = await ClassModel.find().lean();
  const subjectsRaw = await Subject.find().lean();
  const teachersRaw = await Teacher.find({ status: "Active" }).lean();
  
  const classes = classesRaw.map((c: any) => ({
    _id: c._id.toString(),
    grade: c.grade,
    section: c.section,
  }));
  
  const subjects = subjectsRaw.map((s: any) => ({
    _id: s._id.toString(),
    name: s.name,
    code: s.code,
    grade: s.grade,
  }));
  
  const teachers = teachersRaw.map((t: any) => ({
    _id: t._id.toString(),
    name: t.name,
    subject: t.subject,
  }));

  const entry = {
    _id: entryRaw._id.toString(),
    classId: entryRaw.classId.toString(),
    day: entryRaw.day,
    periodNumber: entryRaw.periodNumber,
    startTime: entryRaw.startTime,
    endTime: entryRaw.endTime,
    subjectId: entryRaw.subjectId.toString(),
    teacherId: entryRaw.teacherId.toString(),
    roomNumber: entryRaw.roomNumber || "",
    periodType: entryRaw.periodType,
    academicSession: entryRaw.academicSession,
  };

  return (
    <TimetableForm 
      mode="edit" 
      entry={entry}
      classes={classes} 
      subjects={subjects} 
      teachers={teachers} 
    />
  );
}
