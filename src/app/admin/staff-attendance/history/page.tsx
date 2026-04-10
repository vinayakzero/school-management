import connectDB from "@/lib/mongodb";
import StaffAttendance from "@/models/StaffAttendance";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, Filter } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function StaffAttendanceHistoryPage({ searchParams }: { searchParams: { month?: string } }) {
  await connectDB();
  
  // Default to current month
  const now = new Date();
  const targetYear = searchParams.month ? parseInt(searchParams.month.split("-")[0]) : now.getFullYear();
  const targetMonth = searchParams.month ? parseInt(searchParams.month.split("-")[1]) - 1 : now.getMonth();
  
  const startDate = new Date(targetYear, targetMonth, 1);
  const endDate = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59);

  // Fetch records and group them by date
  // We use populate to get teacher details
  const records = await StaffAttendance.find({
    date: { $gte: startDate, $lte: endDate }
  })
    .populate("teacherId", "name employeeCode department")
    .sort({ date: -1 })
    .lean();

  // Aggregate stats per day
  const dailyStats = new Map();
  records.forEach((r: any) => {
    const dateStr = r.date.toISOString().split("T")[0];
    if (!dailyStats.has(dateStr)) {
      dailyStats.set(dateStr, { Present: 0, Absent: 0, Late: 0, "Half Day": 0, "On Leave": 0, total: 0 });
    }
    const stat = dailyStats.get(dateStr);
    stat[r.status] = (stat[r.status] || 0) + 1;
    stat.total += 1;
  });

  const uniqueDates = Array.from(dailyStats.keys()).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Human Resources"
        title="Attendance History"
        description={`Summary of daily attendance records for ${format(startDate, "MMMM yyyy")}.`}
      >
        <Link href="/admin/staff-attendance" className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft size={18} className="mr-2" />
          Back to Today
        </Link>
      </AdminPageHeader>

      <AdminSectionCard title="Daily Summaries">
        <div className="p-4 border-b border-border bg-muted/30">
           <form className="flex items-center gap-3">
             <label className="text-sm font-semibold">Select Month:</label>
             <input 
               type="month" 
               name="month" 
               defaultValue={`${targetYear}-${String(targetMonth + 1).padStart(2, "0")}`}
               className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
             />
             <button type="submit" className={buttonVariants({ variant: "default", size: "sm" })}>
               <Filter size={14} className="mr-2" /> Filter
             </button>
           </form>
        </div>

        {uniqueDates.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            No attendance records found for this month.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold">Total Marked</th>
                  <th className="px-6 py-4 font-bold text-emerald-600 dark:text-emerald-400">Present</th>
                  <th className="px-6 py-4 font-bold text-red-600 dark:text-red-400">Absent</th>
                  <th className="px-6 py-4 font-bold text-amber-600 dark:text-amber-400">Late / Half Day</th>
                  <th className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">On Leave</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {uniqueDates.map((dateStr) => {
                  const stat = dailyStats.get(dateStr);
                  const parsedDate = new Date(dateStr);
                  return (
                    <tr key={dateStr} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-semibold">
                        {format(parsedDate, "EEE, dd MMM yyyy")}
                      </td>
                      <td className="px-6 py-4">{stat.total}</td>
                      <td className="px-6 py-4">{stat.Present}</td>
                      <td className="px-6 py-4">{stat.Absent}</td>
                      <td className="px-6 py-4">{(stat.Late || 0) + (stat["Half Day"] || 0)}</td>
                      <td className="px-6 py-4">{stat["On Leave"]}</td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          href={`/admin/staff-attendance?date=${parsedDate.toISOString()}`}
                          className="text-primary hover:underline font-semibold"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </AdminSectionCard>
    </div>
  );
}
