import connectDB from "@/lib/mongodb";
import ClassModel from "@/models/Class";
import Subject from "@/models/Subject";
import Teacher from "@/models/Teacher";
import TimetableForm from "../TimetableForm";

export default async function NewTimetablePeriodPage({
  searchParams,
}: {
  searchParams: { classId?: string; day?: string; period?: string };
}) {
  await connectDB();
  
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

  const initialEntry =
    searchParams.classId || searchParams.day || searchParams.period
      ? {
          classId: searchParams.classId,
          day: searchParams.day,
          periodNumber: searchParams.period ? Number.parseInt(searchParams.period, 10) : undefined,
        }
      : undefined;

  return (
    <TimetableForm 
      mode="create" 
      entry={initialEntry}
      classes={classes} 
      subjects={subjects} 
      teachers={teachers} 
    />
  );
}
