import connectDB from "@/lib/mongodb";
import Teacher from "@/models/Teacher";
import LeaveForm from "./LeaveForm";

export default async function NewLeavePage() {
  await connectDB();
  
  const teachersRaw = await Teacher.find({ status: "Active" }).sort({ name: 1 }).lean();
  
  const teachers = teachersRaw.map((t: any) => ({
    _id: t._id.toString(),
    name: t.name,
    employeeCode: t.employeeCode,
    department: t.department,
  }));

  return <LeaveForm teachers={teachers} />;
}
