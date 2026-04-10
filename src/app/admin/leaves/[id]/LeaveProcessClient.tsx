"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { processLeaveAction } from "../actions";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LeaveProcessClient({ leave }: { leave: any }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);

  const handleProcess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData(e.currentTarget);
    const status = formData.get("status") as "Approved" | "Rejected";
    const note = formData.get("approvalNote") as string;
    
    // Fallback to a hardcoded name if session user is missing, for seeded default
    const approverId = session?.user?.id || (session?.user as any)?._id || "system";
    
    await processLeaveAction(leave._id, status, note, approverId);
    
    router.push("/admin/leaves");
    router.refresh();
  };

  const getStatusColor = (s: string) => {
    if (s === "Approved") return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800";
    if (s === "Rejected") return "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800";
    return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800";
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <AdminPageHeader
        eyebrow="Leave Management"
        title="Leave Request Details"
        description="Review applicant details and process the leave request."
      />

      <AdminSectionCard title="Application Snapshot">
        <div className="p-6">
          <div className="flex items-start justify-between border-b border-border pb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">{leave.applicant?.name}</h2>
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {leave.applicantType} • Code: {leave.applicant?.employeeCode || "N/A"} • Dep: {leave.applicant?.department || "N/A"}
              </p>
            </div>
            <Badge variant="outline" className={`${getStatusColor(leave.status)} text-xs px-3 py-1 uppercase tracking-wider`}>
              {leave.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-8 py-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-1">Leave Type</p>
              <p className="text-sm font-medium">{leave.leaveType}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-1">Duration</p>
              <p className="text-sm font-medium">{leave.totalDays} Day(s)</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-1">From Date</p>
              <p className="text-sm font-medium">{format(new Date(leave.fromDate), "EEE, dd MMM yyyy")}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-1">To Date</p>
              <p className="text-sm font-medium">{format(new Date(leave.toDate), "EEE, dd MMM yyyy")}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-1">Reason provided</p>
              <div className="bg-muted/30 p-4 rounded-lg mt-2 text-sm text-foreground">
                {leave.reason}
              </div>
            </div>
            <div className="col-span-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-1">Applied On</p>
              <p className="text-sm font-medium">{format(new Date(leave.appliedOn), "dd MMM yyyy, p")}</p>
            </div>
          </div>
        </div>
      </AdminSectionCard>

      {leave.status === "Pending" ? (
        <AdminSectionCard title="Process Leave">
          <form onSubmit={handleProcess} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Decision</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 border border-border rounded-lg p-3 cursor-pointer hover:bg-muted/50 w-full">
                  <input type="radio" name="status" value="Approved" required className="accent-primary w-4 h-4" />
                  <span className="text-sm font-semibold text-emerald-600">Approve</span>
                </label>
                <label className="flex items-center gap-2 border border-border rounded-lg p-3 cursor-pointer hover:bg-muted/50 w-full">
                  <input type="radio" name="status" value="Rejected" required className="accent-primary w-4 h-4" />
                  <span className="text-sm font-semibold text-red-600">Reject</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Approval / Rejection Note (Optional)</label>
              <textarea 
                name="approvalNote" 
                rows={3} 
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                placeholder="Reason for rejection or special approval terms..."
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" disabled={saving} className={buttonVariants({ variant: "default" })}>
                {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : null}
                Process Application
              </button>
              <Link href="/admin/leaves" className={buttonVariants({ variant: "outline" })}>
                Cancel
              </Link>
            </div>
          </form>
        </AdminSectionCard>
      ) : (
        <AdminSectionCard title="Processing Details">
          <div className="p-6">
            <p className="text-sm font-medium text-muted-foreground">This leave application was <strong className={leave.status === "Approved" ? "text-emerald-600" : "text-red-600"}>{leave.status.toLowerCase()}</strong> on {format(new Date(), "dd MMM yyyy")}.</p>
            {leave.approvalNote && (
              <div className="mt-4 border-l-2 border-primary pl-4 py-1">
                <p className="text-xs uppercase text-muted-foreground font-bold mb-1">Approver Note</p>
                <p className="text-sm text-foreground italic">&quot;{leave.approvalNote}&quot;</p>
              </div>
            )}
            <div className="mt-6">
              <Link href="/admin/leaves" className={buttonVariants({ variant: "outline" })}>Back to Leaves</Link>
            </div>
          </div>
        </AdminSectionCard>
      )}
    </div>
  );
}
