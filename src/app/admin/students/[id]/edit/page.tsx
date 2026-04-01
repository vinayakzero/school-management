import { notFound } from "next/navigation";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import StudentForm from "../../StudentForm";

export const dynamic = "force-dynamic";

export default async function EditStudentPage({ params }: { params: { id: string } }) {
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound();
  }

  await connectDB();
  const student = await Student.findById(params.id).lean();

  if (!student) {
    notFound();
  }

  return <StudentForm student={JSON.parse(JSON.stringify(student))} />;
}
