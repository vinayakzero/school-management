import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import Attendance from "@/models/Attendance";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, User, BookOpen, Users } from "lucide-react";
import StudentProfileActions from "./StudentProfileActions";
import mongoose from "mongoose";

export const dynamic = 'force-dynamic';

export default async function StudentProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await connectDB();

  const student = await Student.findById(id).lean();
  if (!student) notFound();

  const allAttendance = await Attendance.find({
    grade: student.grade,
    section: student.section,
    "records.studentId": student._id,
  }).lean();

  let present = 0, absent = 0, late = 0, excused = 0;
  allAttendance.forEach((doc: any) => {
    const record = doc.records?.find(
      (r: any) => r.studentId?.toString() === id
    );
    if (record) {
      if (record.status === "Present") present++;
      else if (record.status === "Absent") absent++;
      else if (record.status === "Late") late++;
      else if (record.status === "Excused") excused++;
    }
  });
  const totalDays = present + absent + late + excused;
  const attendancePct = totalDays > 0 ? Math.round(((present + late) / totalDays) * 100) : null;

  const s = JSON.parse(JSON.stringify(student));

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link href="/admin/students" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        <ArrowLeft size={16} />
        Back to Students
      </Link>

      {/* Hero Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <div className="h-24 w-24 rounded-2xl bg-white dark:bg-zinc-800 border-4 border-white dark:border-zinc-900 shadow-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-3xl shrink-0">
              {s.name ? s.name.split(" ").slice(0, 2).map((n: string) => n[0]).join("") : "ST"}
            </div>
            <div className="flex-1 pb-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">{s.name || "Unknown Student"}</h1>
              <p className="text-gray-500 dark:text-zinc-400">{s.grade} · Section {s.section} · {s.gender}</p>
            </div>
            <div className="flex items-center gap-3 mt-2 sm:mt-0">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${
                s.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                : s.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                : "bg-gray-100 text-gray-700 border-gray-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
              }`}>
                {s.status}
              </span>
              <StudentProfileActions student={s} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox label="Days Present" value={present} color="emerald" />
        <StatBox label="Days Absent" value={absent} color="red" />
        <StatBox label="Days Late" value={late} color="amber" />
        <StatBox
          label="Attendance Rate"
          value={attendancePct !== null ? `${attendancePct}%` : "N/A"}
          color="blue"
          subtitle={totalDays > 0 ? `Out of ${totalDays} recorded days` : "No records yet"}
        />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-zinc-100 mb-4">Personal Information</h2>
          <div className="space-y-3">
            <InfoRow icon={<Mail size={16} />} label="Email" value={s.email} />
            <InfoRow icon={<Phone size={16} />} label="Phone" value={s.phone} />
            <InfoRow icon={<Calendar size={16} />} label="Date of Birth"
              value={s.dateOfBirth ? new Date(s.dateOfBirth).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"} />
            <InfoRow icon={<MapPin size={16} />} label="Address" value={s.address || "—"} />
            <InfoRow icon={<User size={16} />} label="Gender" value={s.gender} />
            <InfoRow icon={<Calendar size={16} />} label="Enrollment Date"
              value={s.enrollmentDate ? new Date(s.enrollmentDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"} />
          </div>
        </div>

        {/* Parent & Academic Details */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-900 dark:text-zinc-100 mb-4">Parent / Guardian</h2>
            <div className="space-y-3">
              <InfoRow icon={<Users size={16} />} label="Name" value={s.parentName} />
              <InfoRow icon={<Phone size={16} />} label="Phone" value={s.parentPhone} />
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-900 dark:text-zinc-100 mb-4">Academic Details</h2>
            <div className="space-y-3">
              <InfoRow icon={<BookOpen size={16} />} label="Grade" value={s.grade} />
              <InfoRow icon={<BookOpen size={16} />} label="Section" value={`Section ${s.section}`} />
              <InfoRow icon={<Calendar size={16} />} label="Fees (Total)" value={`$${(s.fees?.total || 50000).toLocaleString()}`} />
              <InfoRow icon={<Calendar size={16} />} label="Fees (Paid)" value={`$${(s.fees?.paid || 0).toLocaleString()}`} />
              <InfoRow
                icon={<Calendar size={16} />}
                label="Fees (Pending)"
                value={`$${(s.fees?.pending || s.fees?.total || 50000).toLocaleString()}`}
                valueClass="text-red-600 dark:text-red-400 font-semibold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color, subtitle }: any) {
  const colors: any = {
    emerald: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    red: "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400",
    amber: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400",
    blue: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400",
  };
  return (
    <div className={`rounded-xl p-5 ${colors[color]} border border-current/10`}>
      <p className="text-3xl font-black mb-1">{value}</p>
      <p className="text-sm font-semibold opacity-80">{label}</p>
      {subtitle && <p className="text-xs opacity-60 mt-0.5">{subtitle}</p>}
    </div>
  );
}

function InfoRow({ icon, label, value, valueClass }: any) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-gray-400 dark:text-zinc-500 mt-0.5 shrink-0">{icon}</span>
      <span className="text-sm text-gray-500 dark:text-zinc-400 w-32 shrink-0">{label}</span>
      <span className={`text-sm font-medium text-gray-900 dark:text-zinc-100 ${valueClass || ""}`}>{value}</span>
    </div>
  );
}
