"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar, Save, ArrowLeft, ArrowRight, Loader2, Search } from "lucide-react";
import { markStaffAttendanceAction } from "./actions";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STATUS_OPTIONS = [
  { value: "Present", label: "Present", color: "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30 border-emerald-200" },
  { value: "Absent", label: "Absent", color: "text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950/30 border-red-200" },
  { value: "Late", label: "Late", color: "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30 border-amber-200" },
  { value: "Half Day", label: "Half D", color: "text-orange-700 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/30 border-orange-200" },
  { value: "On Leave", label: "Leave", color: "text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/30 border-blue-200" },
];

export default function StaffAttendanceClient({
  teachers,
  existingRecords,
  currentDateStr,
}: {
  teachers: any[];
  existingRecords: any[];
  currentDateStr: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const [attendanceState, setAttendanceState] = useState<Record<string, any>>(() => {
    const state: Record<string, any> = {};
    const recordsByTeacherId = new Map(existingRecords.map((record) => [record.teacherId, record]));

    teachers.forEach((teacher) => {
      const existing = recordsByTeacherId.get(teacher._id);
      state[teacher._id] = {
        teacherId: teacher._id,
        status: existing ? existing.status : "Present",
        inTime: existing?.inTime || "08:00",
        outTime: existing?.outTime || "15:00",
        note: existing?.note || "",
      };
    });

    return state;
  });

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(search.toLowerCase()) ||
      teacher.department?.toLowerCase().includes(search.toLowerCase()) ||
      teacher.employeeCode?.toLowerCase().includes(search.toLowerCase())
  );

  const resetMessages = () => {
    setSaveError("");
    setSaveMessage("");
  };

  const handleStatusChange = (teacherId: string, status: string) => {
    resetMessages();
    setAttendanceState((prev) => ({
      ...prev,
      [teacherId]: { ...prev[teacherId], status },
    }));
  };

  const handleTimeChange = (teacherId: string, field: "inTime" | "outTime", value: string) => {
    resetMessages();
    setAttendanceState((prev) => ({
      ...prev,
      [teacherId]: { ...prev[teacherId], [field]: value },
    }));
  };

  const handleNoteChange = (teacherId: string, value: string) => {
    resetMessages();
    setAttendanceState((prev) => ({
      ...prev,
      [teacherId]: { ...prev[teacherId], note: value },
    }));
  };

  const handleMarkAll = (status: string) => {
    resetMessages();
    const nextState = { ...attendanceState };
    teachers.forEach((teacher) => {
      nextState[teacher._id] = { ...nextState[teacher._id], status };
    });
    setAttendanceState(nextState);
  };

  const handleSave = async () => {
    setSaving(true);
    resetMessages();

    const result = await markStaffAttendanceAction(new Date(currentDateStr), Object.values(attendanceState));

    setSaving(false);
    if (!result.success) {
      setSaveError(result.error || "Attendance could not be saved.");
      return;
    }

    setSaveMessage("Attendance saved successfully.");
    router.refresh();
  };

  const targetDate = new Date(currentDateStr);
  const prevDate = new Date(targetDate);
  prevDate.setDate(prevDate.getDate() - 1);
  const nextDate = new Date(targetDate);
  nextDate.setDate(nextDate.getDate() + 1);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Human Resources"
        title="Staff Attendance"
        description="Mark and review daily faculty presence, arrival times, and leave statuses."
      >
        <Link href="/admin/staff-attendance/history" className={buttonVariants({ variant: "outline" })}>
          <Calendar size={18} className="mr-2" />
          View History
        </Link>
      </AdminPageHeader>

      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-background p-4 shadow-sm sm:flex-row">
        <div className="flex items-center gap-3">
          <Link href={`/admin/staff-attendance?date=${prevDate.toISOString()}`} className={buttonVariants({ variant: "outline", size: "icon" })}>
            <ArrowLeft size={16} />
          </Link>
          <div className="flex flex-col items-center px-4">
            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {format(targetDate, "EEEE")}
            </span>
            <span className="text-xl font-black text-foreground">
              {format(targetDate, "dd MMM yyyy")}
            </span>
          </div>
          <Link href={`/admin/staff-attendance?date=${nextDate.toISOString()}`} className={buttonVariants({ variant: "outline", size: "icon" })}>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => handleMarkAll("Present")} className={buttonVariants({ variant: "outline", size: "sm" })}>
            Mark All Present
          </button>
          <button disabled={saving} onClick={handleSave} className={buttonVariants({ variant: "default" })}>
            {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
            Save Attendance
          </button>
        </div>
      </div>

      <AdminSectionCard title="Faculty Register" description={`${filteredTeachers.length} staff members listed.`}>
        {saveError ? (
          <div className="border-b border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/20 dark:text-red-300">
            {saveError}
          </div>
        ) : null}
        {saveMessage ? (
          <div className="border-b border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:text-emerald-300">
            {saveMessage}
          </div>
        ) : null}
        <div className="flex flex-col items-center justify-between gap-4 border-b border-border/70 bg-muted/50 p-4 sm:flex-row">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search staff..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-bold">Staff Member</th>
                <th className="px-6 py-4 font-bold min-w-[340px]">Status</th>
                <th className="px-6 py-4 font-bold">In / Out Time</th>
                <th className="px-6 py-4 font-bold">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTeachers.map((teacher) => {
                const state = attendanceState[teacher._id];

                return (
                  <tr key={teacher._id} className="transition-colors hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{teacher.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {teacher.employeeCode || "No Code"} | {teacher.department || teacher.subject}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {STATUS_OPTIONS.map((option) => {
                          const isSelected = state.status === option.value;
                          return (
                            <button
                              key={option.value}
                              onClick={() => handleStatusChange(teacher._id, option.value)}
                              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                                isSelected ? `${option.color} shadow-sm ring-1 ring-inset ring-current` : "border-border bg-background text-muted-foreground hover:bg-muted"
                              }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={state.inTime}
                          onChange={(e) => handleTimeChange(teacher._id, "inTime", e.target.value)}
                          className="rounded-md border border-border bg-background px-2 py-1 text-xs outline-none focus:border-primary"
                        />
                        <span className="text-muted-foreground">-</span>
                        <input
                          type="time"
                          value={state.outTime}
                          onChange={(e) => handleTimeChange(teacher._id, "outTime", e.target.value)}
                          className="rounded-md border border-border bg-background px-2 py-1 text-xs outline-none focus:border-primary"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <input
                        type="text"
                        placeholder="Note..."
                        value={state.note}
                        onChange={(e) => handleNoteChange(teacher._id, e.target.value)}
                        className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-primary"
                      />
                    </td>
                  </tr>
                );
              })}
              {filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    No staff members found matching your search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </AdminSectionCard>
    </div>
  );
}
