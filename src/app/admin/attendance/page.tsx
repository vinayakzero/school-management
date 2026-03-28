import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import Attendance from "@/models/Attendance";
import ClassModel from "@/models/Class";
import AttendanceForm from "./AttendanceForm";
import Link from "next/link";
import { Calendar, Filter, History } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AttendancePage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const dateParam = searchParams.date || new Date().toISOString().split('T')[0];
  const gradeParam = searchParams.grade || "";
  const sectionParam = searchParams.section || "";

  await connectDB();
  const classes = await ClassModel.find().lean();
  const grades = Array.from(new Set(classes.map(c => c.grade))).sort();
  const sections = Array.from(new Set(classes.map(c => c.section))).sort();

  let students: any[] = [];
  let existingRecords: any[] = [];

  if (gradeParam && sectionParam) {
    students = await Student.find({ grade: gradeParam, section: sectionParam })
      .sort({ name: 1 })
      .lean();

    const rawDate = new Date(dateParam);
    const date = new Date(Date.UTC(rawDate.getUTCFullYear(), rawDate.getUTCMonth(), rawDate.getUTCDate()));

    const attendanceDoc = await Attendance.findOne({ date, grade: gradeParam, section: sectionParam }).lean();
    if (attendanceDoc) {
      existingRecords = attendanceDoc.records;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">Attendance</h1>
          <p className="text-gray-500 dark:text-zinc-400">Record and monitor daily student attendance by class.</p>
        </div>
        <Link
          href="/admin/attendance/history"
          className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-800 h-10 px-4 shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <History size={18} />
          View History
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm">
        <form method="GET" className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="date" 
                name="date"
                defaultValue={dateParam}
                required
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-zinc-300"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Grade</label>
            <select 
              name="grade"
              defaultValue={gradeParam}
              required
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-zinc-300"
            >
              <option value="" disabled>Select Grade...</option>
              {grades.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Section</label>
            <select 
              name="section"
              defaultValue={sectionParam}
              required
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-zinc-300"
            >
              <option value="" disabled>Select Section...</option>
              {sections.map(s => (
                <option key={s} value={s}>Section {s}</option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-gray-800 dark:hover:bg-zinc-200 h-10 px-4 transition-colors">
              <Filter size={16} />
              Load Roster
            </button>
          </div>
        </form>
      </div>

      {gradeParam && sectionParam ? (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-4 sm:px-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center bg-gray-50/50 dark:bg-zinc-900/50">
            <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100">
              {gradeParam} - Section {sectionParam}
            </h2>
            <span className="text-sm font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
              {new Date(dateParam).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'})}
            </span>
          </div>
          
          {students.length > 0 ? (
            <AttendanceForm 
              students={JSON.parse(JSON.stringify(students))} 
              existingRecords={JSON.parse(JSON.stringify(existingRecords))}
              dateString={dateParam}
              grade={gradeParam}
              section={sectionParam}
            />
          ) : (
            <div className="p-12 text-center text-gray-500 dark:text-zinc-400">
              No students found for this class. 
              <Link href="/admin/students" className="block mt-2 text-blue-600 dark:text-blue-400 hover:underline">Add students to get started.</Link>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-zinc-900/50 border border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-12 text-center">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 dark:text-zinc-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100">No Class Selected</h3>
          <p className="mt-1 text-gray-500 dark:text-zinc-400 max-w-sm mx-auto">Use the filters above to select a date, grade, and section to begin recording attendance.</p>
        </div>
      )}
    </div>
  );
}
