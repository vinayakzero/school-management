"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, CheckCircle, Clock, XCircle } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LeaveClient({ leaves }: { leaves: any[] }) {
  const [filter, setFilter] = useState("All");

  const filteredLeaves = leaves.filter(l => filter === "All" || l.status === filter);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Human Resources"
        title="Leave Management"
        description="Review, approve, and track staff leave applications."
      >
        <Link href="/admin/leaves/new" className={buttonVariants({ variant: "default" })}>
          <Plus size={18} className="mr-2" />
          Log Leave Application
        </Link>
      </AdminPageHeader>

      <AdminSectionCard
        title="Leave Requests"
        description="Manage pending requests and view historical leave records."
      >
        <div className="flex flex-wrap items-center gap-2 border-b border-border/70 bg-muted/50 p-4">
          {["All", "Pending", "Approved", "Rejected"].map((opt) => (
            <Badge
              key={opt}
              variant={filter === opt ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilter(opt)}
            >
              {opt}
            </Badge>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-bold">Applicant</th>
                <th className="px-6 py-4 font-bold">Type</th>
                <th className="px-6 py-4 font-bold">Duration</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeaves.map((leave) => (
                <tr key={leave._id} className="transition-colors hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground">{leave.applicant?.name || "Unknown"}</div>
                    <div className="text-xs text-muted-foreground">{leave.applicantType}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">{leave.leaveType}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">
                      {format(new Date(leave.fromDate), "dd MMM")} - {format(new Date(leave.toDate), "dd MMM yyyy")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {leave.totalDays} Day(s)
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-semibold text-xs">
                      {leave.status === "Pending" && <><Clock size={14} className="text-amber-500"/> <span className="text-amber-600">Pending</span></>}
                      {leave.status === "Approved" && <><CheckCircle size={14} className="text-emerald-500"/> <span className="text-emerald-600">Approved</span></>}
                      {leave.status === "Rejected" && <><XCircle size={14} className="text-red-500"/> <span className="text-red-600">Rejected</span></>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/leaves/${leave._id}`}
                      className="text-primary font-semibold hover:underline"
                    >
                      Process
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredLeaves.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">No leave request found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminSectionCard>
    </div>
  );
}
