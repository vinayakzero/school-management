import connectDB from "@/lib/mongodb";
import Exam from "@/models/Exam";
import ExamsClient from "./ExamsClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ExamsPage() {
  await connectDB();
  const exams = await Exam.find()
    .populate("subject", "name code")
    .sort({ date: -1, name: 1 })
    .lean();

  return <ExamsClient exams={JSON.parse(JSON.stringify(exams))} subjects={[]} />;
}
