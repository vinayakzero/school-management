"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTimetableEntryAction, updateTimetableEntryAction } from "./actions";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { AlertCircle } from "lucide-react";

export default function TimetableForm({ 
  mode, 
  entry, 
  classes, 
  subjects, 
  teachers 
}: { 
  mode: "create" | "edit", 
  entry?: any,
  classes: any[],
  subjects: any[],
  teachers: any[]
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    
    // Auto populate grade and section from selected class
    const selectedClassId = formData.get("classId");
    const selectedCls = classes.find((c) => c._id === selectedClassId);
    if (!selectedCls) {
      setError("Please select a valid class");
      setSaving(false);
      return;
    }
    formData.append("grade", selectedCls.grade);
    formData.append("section", selectedCls.section);

    const res = mode === "create"
      ? await createTimetableEntryAction(formData)
      : await updateTimetableEntryAction(entry!._id, formData);

    if (res.success) {
      // Redirect back to the class timetable view
      router.push(`/admin/timetable/class/${selectedClassId}`);
      router.refresh();
    } else {
      setError(res.error || "Something went wrong.");
      setSaving(false);
    }
  };

  const fieldClass = "mt-2 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all";
  const labelClass = "block text-sm font-semibold text-foreground";

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Schedule Management"
        title={mode === "create" ? "Add Period to Timetable" : "Edit Timetable Period"}
        description={
          mode === "create"
            ? "Assign a teacher to a subject for a specific class period. The system will prevent double-booking."
            : "Update this period's schedule details."
        }
      />

      <form onSubmit={handleSubmit}>
        <AdminSectionCard title="Period Details" description="Define the class, timing, and academic details for this period.">
          <div className="grid gap-5 p-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Class</label>
              <select name="classId" required defaultValue={entry?.classId} className={fieldClass}>
                <option value="">Select Class...</option>
                {classes.map(c => (
                  <option key={c._id} value={c._id}>{c.grade} - Section {c.section}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className={labelClass}>Day of Week</label>
              <select name="day" required defaultValue={entry?.day || "Monday"} className={fieldClass}>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Period Number</label>
                <input type="number" name="periodNumber" required min="1" max="10" defaultValue={entry?.periodNumber} className={fieldClass} placeholder="e.g. 1" />
              </div>
              <div>
                <label className={labelClass}>Period Type</label>
                <select name="periodType" required defaultValue={entry?.periodType || "Theory"} className={fieldClass}>
                  {["Theory", "Practical", "Break", "Activity"].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Start Time</label>
                <input type="time" name="startTime" required defaultValue={entry?.startTime || "08:00"} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass}>End Time</label>
                <input type="time" name="endTime" required defaultValue={entry?.endTime || "08:45"} className={fieldClass} />
              </div>
            </div>
            
            <div>
              <label className={labelClass}>Subject</label>
              <select name="subjectId" required defaultValue={entry?.subjectId} className={fieldClass}>
                <option value="">Select Subject...</option>
                {subjects.map(s => (
                  <option key={s._id} value={s._id}>{s.name} ({s.code}) - {s.grade}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Teacher</label>
              <select name="teacherId" required defaultValue={entry?.teacherId} className={fieldClass}>
                <option value="">Select Teacher...</option>
                {teachers.map(t => (
                  <option key={t._id} value={t._id}>{t.name} ({t.subject})</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Room Number (Optional)</label>
              <input type="text" name="roomNumber" defaultValue={entry?.roomNumber} className={fieldClass} placeholder="e.g. Lab 1" />
            </div>

            <div>
              <label className={labelClass}>Academic Session</label>
              <input type="text" name="academicSession" required defaultValue={entry?.academicSession || "2026-2027"} className={fieldClass} />
            </div>
          </div>
        </AdminSectionCard>

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" />
            <p className="text-sm font-medium text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-60 transition-all"
          >
            {saving ? "Saving…" : mode === "create" ? "Save to Timetable" : "Update Period"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-2xl border border-border px-6 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-accent transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
