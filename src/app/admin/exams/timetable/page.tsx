import connectDB from "@/lib/mongodb";
import Exam from "@/models/Exam";
import Setting from "@/models/Setting";
import { PrintPageLayout } from "@/components/admin/print-layout";

export const dynamic = "force-dynamic";

export default async function ExamTimetablePrintPage() {
  await connectDB();

  const [exams, setting] = await Promise.all([
    Exam.find().populate("subject", "name code").sort({ grade: 1, date: 1, name: 1 }).lean(),
    Setting.findOne().lean(),
  ]);

  const schoolName = setting?.schoolName || "My School";
  const academicYear = setting?.academicYear || "2026-2027";
  const grouped = exams.reduce((map: Map<string, any[]>, exam: any) => {
    const current = map.get(exam.grade) || [];
    current.push(exam);
    map.set(exam.grade, current);
    return map;
  }, new Map<string, any[]>());

  return (
    <PrintPageLayout
      backHref="/admin/exams"
      backLabel="Back to Exams"
      eyebrow="Academic Printout"
      title="Exam Timetable"
      subtitle={`${schoolName} • Academic Year ${academicYear}`}
      note="Open browser print to print this timetable."
    >
      <>
        <div className="space-y-8 px-8 py-8">
          {Array.from(grouped.entries()).map(([grade, gradeExams]) => (
            <section key={grade} className="space-y-4">
              <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-3 dark:border-zinc-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100">{grade}</h2>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                  {gradeExams.length} exams
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-zinc-800">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 dark:bg-zinc-800/50">
                    <tr className="text-gray-500 dark:text-zinc-400">
                      <th className="px-5 py-4 font-semibold">Date</th>
                      <th className="px-5 py-4 font-semibold">Exam</th>
                      <th className="px-5 py-4 font-semibold">Subject</th>
                      <th className="px-5 py-4 font-semibold">Subject Code</th>
                      <th className="px-5 py-4 font-semibold text-right">Marks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                    {gradeExams.map((exam: any) => (
                      <tr key={exam._id}>
                        <td className="px-5 py-4 text-gray-600 dark:text-zinc-300">
                          {new Date(exam.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td className="px-5 py-4 font-semibold text-gray-900 dark:text-zinc-100">{exam.name}</td>
                        <td className="px-5 py-4 text-gray-600 dark:text-zinc-300">{(exam.subject as any)?.name || "Subject"}</td>
                        <td className="px-5 py-4 text-gray-500 dark:text-zinc-400">{(exam.subject as any)?.code || "-"}</td>
                        <td className="px-5 py-4 text-right font-semibold text-gray-900 dark:text-zinc-100">{exam.totalMarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </>
    </PrintPageLayout>
  );
}
