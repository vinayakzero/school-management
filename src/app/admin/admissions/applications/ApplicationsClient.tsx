"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ClipboardCheck, FileText, FolderCheck, Search, ShieldCheck } from "lucide-react";
import { AdminEmptyState } from "@/components/admin/empty-state";
import { AdminMetricCard } from "@/components/admin/metric-card";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatShortDate } from "@/lib/date";
import { getAdmissionApplicationStatusBadge, type AdmissionApplicationStatus } from "@/lib/admissions";

export default function ApplicationsClient({
  applications: initialApplications,
  activeAcademicYear,
}: {
  applications: any[];
  activeAcademicYear: string;
}) {
  const [applications] = useState(initialApplications);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdmissionApplicationStatus | "All">("All");
  const [yearFilter, setYearFilter] = useState("All");

  const academicYears = useMemo(() => {
    return Array.from(new Set(applications.map((application) => application.academicYear).filter(Boolean)));
  }, [applications]);

  const filtered = useMemo(() => {
    return applications.filter((application) => {
      const searchable = [
        application.applicationNumber,
        application.parentName,
        application.studentName,
        application.studentGradeInterest,
        application.email,
        application.phone,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchable.includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" ? true : application.status === statusFilter;
      const matchesYear = yearFilter === "All" ? true : application.academicYear === yearFilter;
      return matchesSearch && matchesStatus && matchesYear;
    });
  }, [applications, search, statusFilter, yearFilter]);

  const summary = useMemo(() => {
    return {
      total: applications.length,
      draft: applications.filter((application) => application.status === "Draft").length,
      review: applications.filter((application) => application.status === "Review Scheduled").length,
      ready: applications.filter((application) => application.status === "Ready for Enrollment").length,
    };
  }, [applications]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Admissions Workflow"
        title="Application Register"
        description="Track families who have moved beyond inquiry into active admissions processing, document collection, and review readiness."
      >
        <Link href="/admin/admissions" className={buttonVariants({ variant: "outline" })}>
          Back to Admissions Desk
        </Link>
        <div className="rounded-xl border border-border/80 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground">
          Active year: <span className="text-foreground">{activeAcademicYear || "Not set"}</span>
        </div>
      </AdminPageHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard
          label="Applications"
          value={summary.total.toLocaleString()}
          description="Records linked to admissions inquiries"
          icon={<FileText className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Draft"
          value={summary.draft.toLocaleString()}
          description="Started but not yet document-ready"
          tone="amber"
          icon={<ClipboardCheck className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Review Scheduled"
          value={summary.review.toLocaleString()}
          description="Counselor review or next checkpoint set"
          tone="sky"
          icon={<ShieldCheck className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Ready for Enrollment"
          value={summary.ready.toLocaleString()}
          description="Documents and review nearing conversion"
          tone="emerald"
          icon={<FolderCheck className="h-5 w-5" />}
        />
      </div>

      <AdminSectionCard
        title="Application Pipeline"
        description="Filter by academic year, search by family or student, and open the full application workflow record."
      >
        <div className="grid gap-4 border-b border-border/70 bg-muted/50 p-4 lg:grid-cols-[minmax(0,1fr)_180px_180px_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by application no., family, student, grade, or contact"
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as AdmissionApplicationStatus | "All")}>
            <option value="All">All statuses</option>
            <option value="Draft">Draft</option>
            <option value="Documents Pending">Documents Pending</option>
            <option value="Review Scheduled">Review Scheduled</option>
            <option value="Ready for Enrollment">Ready for Enrollment</option>
            <option value="Closed">Closed</option>
          </Select>
          <Select value={yearFilter} onChange={(event) => setYearFilter(event.target.value)}>
            <option value="All">All academic years</option>
            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
          <div className="flex items-center justify-end text-sm font-medium text-muted-foreground">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-6">
            <AdminEmptyState
              icon={FileText}
              title="No application records matched the current view"
              description="Start applications from inquiry detail pages when families are ready to move past the first contact stage."
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Application</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Family</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Inquiry</TableHead>
                <TableHead className="text-right">Open</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((application) => (
                <TableRow key={application._id}>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-foreground">{application.applicationNumber}</p>
                      <p className="text-xs text-muted-foreground">{application.academicYear}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{application.studentName}</p>
                      <p className="text-xs text-muted-foreground">{application.studentGradeInterest}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{application.parentName}</p>
                      <p className="text-xs text-muted-foreground">{application.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getAdmissionApplicationStatusBadge(application.status)}>{application.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {application.reviewDate ? formatShortDate(application.reviewDate) : "Not scheduled"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {application.inquiry?.requestType || "Linked inquiry"}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Link
                        href={`/admin/admissions/applications/${application._id}`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        Open
                      </Link>
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
