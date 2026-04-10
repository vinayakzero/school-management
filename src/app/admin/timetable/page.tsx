import connectDB from "@/lib/mongodb";
import ClassModel from "@/models/Class";
import Timetable from "@/models/Timetable";
import TimetableClient from "./TimetableClient";

export const dynamic = "force-dynamic";

export default async function TimetablePage() {
  await connectDB();
  
  // Get all classes
  const classesRaw = await ClassModel.find().populate("classTeacher", "name").lean();
  
  // Count timetable periods per class to show on the cards
  const summaryAgg = await Timetable.aggregate([
    { $group: { _id: "$classId", count: { $sum: 1 } } }
  ]);
  const countMap = new Map(summaryAgg.map(s => [s._id.toString(), s.count]));

  const classes = classesRaw.map((c: any) => ({
    _id: c._id.toString(),
    grade: c.grade,
    section: c.section,
    classTeacher: c.classTeacher ? { _id: c.classTeacher._id.toString(), name: c.classTeacher.name } : null,
    periodCount: countMap.get(c._id.toString()) || 0,
  })).sort((a, b) => {
    // Basic sort by grade then section
    if (a.grade === b.grade) return a.section.localeCompare(b.section);
    return a.grade.localeCompare(b.grade);
  });

  return <TimetableClient classes={classes} />;
}
