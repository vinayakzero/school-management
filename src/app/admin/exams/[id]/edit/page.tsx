import { notFound } from "next/navigation";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Exam from "@/models/Exam";
import Subject from "@/models/Subject";
import ExamForm from "../../ExamForm";

export const dynamic = "force-dynamic";

export default async function EditExamPage({ params }: { params: { id: string } }) {
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound();
  }

  await connectDB();

  const [exam, subjects] = await Promise.all([
    Exam.findById(params.id).populate("subject", "name code _id").lean(),
    Subject.find().select("name code grade _id").sort({ grade: 1, name: 1 }).lean(),
  ]);

  if (!exam) {
    notFound();
  }

  return <ExamForm subjects={JSON.parse(JSON.stringify(subjects))} examToEdit={JSON.parse(JSON.stringify(exam))} />;
}
