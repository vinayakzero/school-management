import Link from "next/link";
import { ArrowLeft, CalendarDays, ClipboardCheck, FileText, FolderCheck } from "lucide-react";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import AdmissionApplication from "@/models/AdmissionApplication";
import { AdminMetricCard } from "@/components/admin/metric-card";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatShortDate } from "@/lib/date";
import { getAdmissionApplicationStatusBadge } from "@/lib/admissions";
import { updateAdmissionApplicationAction } from "../../actions";

export const dynamic = "force-dynamic";

function formatDateInput(value?: string | Date | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
}

function getNotice(searchParams?: { [key: string]: string | string[] | undefined }) {
  const saved = typeof searchParams?.saved === "string" ? searchParams.saved : undefined;
  const error = typeof searchParams?.error === "string" ? searchParams.error : undefined;

  if (saved === "created") {
    return {
      tone: "success" as const,
      message: "Admissions application created and linked to the inquiry successfully.",
    };
  }

  if (saved === "existing") {
    return {
      tone: "success" as const,
      message: "An existing admissions application was already linked to this inquiry.",
    };
  }

  if (saved === "application") {
    return {
      tone: "success" as const,
      message: "Admissions application updated successfully.",
    };
  }

  if (error) {
    return {
      tone: "error" as const,
      message: error === "invalid-status" ? "The selected application status is invalid." : "The application could not be updated.",
    };
  }

  return undefined;
}

export default async function AdmissionApplicationDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  await connectDB();

  const application = await AdmissionApplication.findById(params.id).populate("inquiry").lean();

  if (!application) {
    notFound();
  }

  const inquiry = application.inquiry as any;
  const checklist = application.documentChecklist || [];
  const resolvedDocuments = checklist.filter((item: any) => item.status !== "Pending").length;
  const verifiedDocuments = checklist.filter((item: any) => item.status === "Verified").length;
  const notice = getNotice(searchParams);
  const updateAction = updateAdmissionApplicationAction.bind(null, params.id);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Admissions Application"
        title={application.applicationNumber}
        description="Refine the family profile, review schedule, and document readiness before converting the student into the formal enrollment workflow."
      >
        {inquiry?._id ? (
          <Link href={`/admin/admissions/${inquiry._id.toString()}`} className={buttonVariants({ variant: "outline" })}>
            Open Inquiry
          </Link>
        ) : null}
        <Link href="/admin/admissions/applications" className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft size={16} />
          Back to Applications
        </Link>
      </AdminPageHeader>

      {notice ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
            notice.tone === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
          }`}
        >
          {notice.message}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard
          label="Application Status"
          value={application.status}
          description={`Academic year ${application.academicYear}`}
          tone={application.status === "Ready for Enrollment" ? "emerald" : application.status === "Closed" ? "rose" : "primary"}
          icon={<FileText className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Review Date"
          value={application.reviewDate ? formatShortDate(application.reviewDate) : "Not Set"}
          description="Next counselor checkpoint"
          tone="sky"
          icon={<CalendarDays className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Documents Resolved"
          value={`${resolvedDocuments}/${checklist.length}`}
          description="Received, verified, or waived items"
          tone="amber"
          icon={<ClipboardCheck className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Verified"
          value={verifiedDocuments.toLocaleString()}
          description="Checklist items fully cleared"
          tone="emerald"
          icon={<FolderCheck className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <AdminSectionCard title="Application Profile" description="Editable family and student details carried forward from the original inquiry.">
            <div className="grid gap-5 p-6 md:grid-cols-2">
              <DetailItem label="Application Number" value={application.applicationNumber} />
              <DetailItem label="Academic Year" value={application.academicYear} />
              <DetailItem label="Parent / Guardian" value={application.parentName} />
              <DetailItem label="Student" value={application.studentName} />
              <DetailItem label="Grade Interest" value={application.studentGradeInterest} />
              <DetailItem label="Email" value={application.email} />
              <DetailItem label="Phone" value={application.phone} />
              <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Status</p>
                <div className="mt-2">
                  <Badge variant={getAdmissionApplicationStatusBadge(application.status)}>{application.status}</Badge>
                </div>
              </div>
            </div>
          </AdminSectionCard>

          <AdminSectionCard title="Inquiry Source" description="Original public request that triggered this application workflow.">
            <div className="space-y-5 p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant={getAdmissionApplicationStatusBadge(application.status)}>{application.status}</Badge>
                {inquiry?.requestType ? <Badge variant={inquiry.requestType === "Campus Visit" ? "secondary" : "outline"}>{inquiry.requestType}</Badge> : null}
                {inquiry?.status ? <Badge variant="muted">Inquiry: {inquiry.status}</Badge> : null}
                {inquiry?.preferredVisitDate ? <Badge variant="secondary">Visit {formatShortDate(inquiry.preferredVisitDate)}</Badge> : null}
              </div>
              <p className="text-sm leading-7 text-foreground">
                {application.applicationNotes || inquiry?.message || "No application or inquiry notes have been saved for this family yet."}
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <DetailItem label="Source Page" value={inquiry?.sourcePage || "Admissions desk"} />
                <DetailItem label="Inquiry Submitted" value={inquiry?.createdAt ? formatShortDate(inquiry.createdAt) : formatShortDate(application.createdAt)} />
              </div>
            </div>
          </AdminSectionCard>
        </div>

        <AdminSectionCard title="Application Control" description="Move the application through review and document readiness while keeping inquiry status aligned.">
          <form action={updateAction} className="space-y-6 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Status</label>
                <Select name="status" defaultValue={application.status}>
                  <option value="Draft">Draft</option>
                  <option value="Documents Pending">Documents Pending</option>
                  <option value="Review Scheduled">Review Scheduled</option>
                  <option value="Ready for Enrollment">Ready for Enrollment</option>
                  <option value="Closed">Closed</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Academic Year</label>
                <Input name="academicYear" defaultValue={application.academicYear} placeholder="2026-2027" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Review Date</label>
                <Input name="reviewDate" type="date" defaultValue={formatDateInput(application.reviewDate)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Grade Interest</label>
                <Input name="studentGradeInterest" defaultValue={application.studentGradeInterest} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Parent / Guardian</label>
                <Input name="parentName" defaultValue={application.parentName} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Student Name</label>
                <Input name="studentName" defaultValue={application.studentName} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Email</label>
                <Input name="email" type="email" defaultValue={application.email} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Phone</label>
                <Input name="phone" defaultValue={application.phone} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Document Checklist</label>
              <div className="space-y-3 rounded-2xl border border-border/80 bg-muted/40 p-4">
                {checklist.map((item: any) => (
                  <div key={item.key} className="rounded-2xl border border-border/70 bg-background/90 p-4">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <div className="mt-3 grid gap-3 md:grid-cols-[180px_minmax(0,1fr)]">
                      <Select name={`checklistStatus:${item.key}`} defaultValue={item.status}>
                        <option value="Pending">Pending</option>
                        <option value="Received">Received</option>
                        <option value="Verified">Verified</option>
                        <option value="Waived">Waived</option>
                      </Select>
                      <Input
                        name={`checklistNote:${item.key}`}
                        defaultValue={item.note || ""}
                        placeholder="Add a quick note about this document item"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Application Notes</label>
              <Textarea
                name="applicationNotes"
                defaultValue={application.applicationNotes || ""}
                className="min-h-[120px]"
                placeholder="Application-specific context, family expectations, or academic alignment notes."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Counselor Notes</label>
              <Textarea
                name="counselorNotes"
                defaultValue={application.counselorNotes || ""}
                className="min-h-[180px]"
                placeholder="Internal review updates, next actions, or enrollment readiness comments."
              />
            </div>

            <div className="rounded-2xl border border-border/80 bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
              This application layer is the bridge between public admissions interest and later student enrollment conversion. Keep review dates and checklist status current so the school office has an accurate pipeline.
            </div>

            <div className="flex justify-end">
              <button type="submit" className={buttonVariants({ variant: "default" })}>
                Save Application
              </button>
            </div>
          </form>
        </AdminSectionCard>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
