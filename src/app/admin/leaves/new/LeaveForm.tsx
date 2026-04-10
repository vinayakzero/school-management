"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLeaveAction } from "../actions";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function LeaveForm({ teachers }: { teachers: any[] }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const res = await createLeaveAction(formData);
    if (res.success) {
      router.push("/admin/leaves");
      router.refresh();
    } else {
      setError(res.error || "Failed to create leave application.");
      setSaving(false);
    }
  };

  const fieldClass = "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary";
  const labelClass = "block text-sm font-semibold text-foreground";

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <AdminPageHeader
        eyebrow="Leave Management"
        title="Log Leave Application"
        description="Manually record a leave application for a faculty member."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <AdminSectionCard title="Application Details">
          <div className="p-6 space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Applicant Type</label>
                <select name="applicantType" required className={fieldClass}>
                  <option value="Teacher">Teacher/Faculty</option>
                  <option value="Staff" disabled>Non-Teaching Staff (Coming Soon)</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Select Staff Member</label>
                <select name="applicantId" required className={fieldClass}>
                  <option value="">Select staff...</option>
                  {teachers.map(t => (
                    <option key={t._id} value={t._id}>
                      {t.name} {t.employeeCode ? `(${t.employeeCode})` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Leave Category</label>
              <select name="leaveType" required className={fieldClass}>
                <option value="Sick">Sick Leave</option>
                <option value="Casual">Casual Leave</option>
                <option value="Earned">Earned Leave</option>
                <option value="Maternity">Maternity Leave</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>From Date</label>
                <input type="date" name="fromDate" required className={fieldClass} />
              </div>
              <div>
                <label className={labelClass}>To Date</label>
                <input type="date" name="toDate" required className={fieldClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Total Days</label>
              <input type="number" name="totalDays" step="0.5" min="0.5" required className={fieldClass} placeholder="e.g. 2.5" />
            </div>

            <div>
              <label className={labelClass}>Reason / Note</label>
              <textarea name="reason" rows={3} required className={fieldClass} placeholder="Reason for leave" />
            </div>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          </div>

          <div className="flex items-center gap-3 border-t border-border p-4 bg-muted/20">
            <button type="submit" disabled={saving} className={buttonVariants({ variant: "default" })}>
              {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : null}
              Submit Leave Log
            </button>
            <Link href="/admin/leaves" className={buttonVariants({ variant: "outline" })}>
              Cancel
            </Link>
          </div>
        </AdminSectionCard>
      </form>
    </div>
  );
}
