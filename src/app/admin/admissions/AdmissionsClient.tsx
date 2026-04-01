"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarDays, ClipboardList, FileText, Search, ShieldCheck, Trash2, UserSearch } from "lucide-react";
import { AdminMetricCard } from "@/components/admin/metric-card";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { AdminEmptyState } from "@/components/admin/empty-state";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteAdmissionInquiryAction } from "./actions";
import { getAdmissionStatusBadge, type AdmissionStatus } from "@/lib/admissions";
import { formatShortDate } from "@/lib/date";

export default function AdmissionsClient({
  leads: initialLeads,
  applicationCount,
}: {
  leads: any[];
  applicationCount: number;
}) {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdmissionStatus | "All">("All");
  const [typeFilter, setTypeFilter] = useState<"All" | "Admission Inquiry" | "Campus Visit">("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      const searchable = [
        lead.parentName,
        lead.studentName,
        lead.email,
        lead.phone,
        lead.studentGradeInterest,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchable.includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" ? true : lead.status === statusFilter;
      const matchesType = typeFilter === "All" ? true : lead.requestType === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [leads, search, statusFilter, typeFilter]);

  const summary = useMemo(() => {
    const newCount = leads.filter((lead) => lead.status === "New" || lead.status === "Visit Requested").length;
    const activeCount = leads.filter((lead) => lead.status !== "Closed").length;
    const visitCount = leads.filter((lead) => lead.requestType === "Campus Visit").length;
    return {
      total: leads.length,
      newCount,
      activeCount,
      visitCount,
    };
  }, [leads]);

  const handleDelete = async (id: string, studentName: string) => {
    if (!confirm(`Delete the admissions record for ${studentName}? This removes the saved public inquiry from the pipeline.`)) return;

    setDeletingId(id);
    const result = await deleteAdmissionInquiryAction(id);
    if (result.success) {
      setLeads((current) => current.filter((lead) => lead._id !== id));
    }
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Next Module"
        title="Admissions Desk"
        description="Manage public admissions inquiries and campus visit requests from one backend-ready operational console."
      >
        <Link href="/admin/admissions/applications" className={buttonVariants({ variant: "outline" })}>
          <FileText size={16} />
          Applications ({applicationCount})
        </Link>
      </AdminPageHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard
          label="Total Leads"
          value={summary.total.toLocaleString()}
          description="Saved public submissions"
          icon={<ClipboardList className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Needs Follow-up"
          value={summary.newCount.toLocaleString()}
          description="New and visit-requested records"
          tone="amber"
          icon={<UserSearch className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Campus Visit Leads"
          value={summary.visitCount.toLocaleString()}
          description="Families asking to visit"
          tone="sky"
          icon={<CalendarDays className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Active Pipeline"
          value={summary.activeCount.toLocaleString()}
          description="Records not yet closed"
          tone="emerald"
          icon={<ShieldCheck className="h-5 w-5" />}
        />
      </div>

      <AdminSectionCard
        title="Inquiry Register"
        description="Search by family, student, grade, or contact details and move into the admissions workflow."
      >
        <div className="grid gap-4 border-b border-border/70 bg-muted/50 p-4 lg:grid-cols-[minmax(0,1fr)_180px_180px_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by family, student, grade, email, or phone"
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as AdmissionStatus | "All")}>
            <option value="All">All statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Visit Requested">Visit Requested</option>
            <option value="Visit Scheduled">Visit Scheduled</option>
            <option value="Application Started">Application Started</option>
            <option value="Closed">Closed</option>
          </Select>
          <Select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as "All" | "Admission Inquiry" | "Campus Visit")}>
            <option value="All">All requests</option>
            <option value="Admission Inquiry">Admission Inquiry</option>
            <option value="Campus Visit">Campus Visit</option>
          </Select>
          <div className="flex items-center justify-end text-sm font-medium text-muted-foreground">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-6">
            <AdminEmptyState
              icon={ClipboardList}
              title="No admissions records matched the current view"
              description="Public forms will populate this desk automatically once families begin sending inquiries or campus visit requests."
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Family</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Request</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Follow-up</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => (
                <TableRow key={lead._id}>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-foreground">{lead.parentName}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                      <p className="text-xs text-muted-foreground">{lead.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{lead.studentName}</div>
                    <div className="text-xs text-muted-foreground">{lead.studentGradeInterest}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={lead.requestType === "Campus Visit" ? "secondary" : "outline"}>{lead.requestType}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getAdmissionStatusBadge(lead.status)}>{lead.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {lead.followUpDate
                      ? formatShortDate(lead.followUpDate)
                      : lead.preferredVisitDate
                        ? `Visit ${formatShortDate(lead.preferredVisitDate)}`
                        : "Not set"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatShortDate(lead.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/admissions/${lead._id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                        Open
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(lead._id, lead.studentName)}
                        disabled={deletingId === lead._id}
                        className={buttonVariants({ variant: "ghost", size: "icon" })}
                        title="Delete inquiry"
                      >
                        <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </AdminSectionCard>
    </div>
  );
}
