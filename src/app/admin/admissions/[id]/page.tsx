import Link from "next/link";
import { ArrowLeft, CalendarDays, ClipboardList, FileText, Mail, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import AdmissionApplication from "@/models/AdmissionApplication";
import AdmissionInquiry from "@/models/AdmissionInquiry";
import { AdminMetricCard } from "@/components/admin/metric-card";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatShortDate } from "@/lib/date";
import { getAdmissionStatusBadge } from "@/lib/admissions";
import { startAdmissionApplicationAction, updateAdmissionInquiryWorkflowAction } from "../actions";

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

  if (saved === "workflow") {
    return {
      tone: "success" as const,
      message: "Admissions workflow updated successfully.",
    };
  }

  if (error) {
    return {
      tone: "error" as const,
      message: error === "invalid-status" ? "The selected workflow status is invalid." : "The admissions record could not be updated.",
    };
  }

  return undefined;
}

export default async function AdmissionInquiryDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  await connectDB();
  const [inquiry, application] = await Promise.all([
    AdmissionInquiry.findById(params.id).lean(),
    AdmissionApplication.findOne({ inquiry: params.id }).lean(),
  ]);

  if (!inquiry) {
    notFound();
  }

  const notice = getNotice(searchParams);
  const updateAction = updateAdmissionInquiryWorkflowAction.bind(null, params.id);
  const createApplicationAction = startAdmissionApplicationAction.bind(null, params.id);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Admissions Workflow"
        title={`${inquiry.studentName} Inquiry`}
        description="Review the family request, confirm visit preferences, and move the record through the admissions pipeline."
      >
        {application?._id ? (
          <Link href={`/admin/admissions/applications/${application._id.toString()}`} className={buttonVariants({ variant: "default" })}>
            <FileText size={16} />
            Open Application
          </Link>
        ) : (
          <form action={createApplicationAction}>
            <button type="submit" className={buttonVariants({ variant: "success" })}>
              <FileText size={16} />
              Start Application
            </button>
          </form>
        )}
        <Link href="/admin/admissions" className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft size={16} />
          Back to Admissions
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
          label="Request Type"
          value={inquiry.requestType}
          description={`Submitted via ${inquiry.sourcePage}`}
          tone="primary"
          icon={<ClipboardList className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Status"
          value={inquiry.status}
          description={inquiry.lastContactedAt ? `Last contacted ${formatShortDate(inquiry.lastContactedAt)}` : "No contact logged yet"}
          tone={inquiry.status === "Closed" ? "amber" : inquiry.status === "Application Started" ? "emerald" : "sky"}
          icon={<CalendarDays className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Submitted"
          value={formatShortDate(inquiry.createdAt)}
          description={inquiry.followUpDate ? `Follow-up ${formatShortDate(inquiry.followUpDate)}` : "Follow-up not scheduled"}
          tone="violet"
          icon={<Mail className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Grade Interest"
          value={inquiry.studentGradeInterest}
          description="Student entry band requested"
          tone="amber"
          icon={<Phone className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <AdminSectionCard
            title="Application Pipeline"
            description="Move this family from inquiry into the structured admissions application workflow."
          >
            <div className="space-y-4 p-6">
              {application?._id ? (
                <>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="success">Application Linked</Badge>
                    <Badge variant="outline">{application.applicationNumber}</Badge>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    This inquiry already has an admissions application record. Continue the family workflow from the application register to manage document readiness and review scheduling.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <DetailItem label="Application Number" value={application.applicationNumber} />
                    <DetailItem label="Application Status" value={application.status} />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm leading-7 text-muted-foreground">
                    When the family is ready to move beyond the inquiry stage, start an application record to track documents, counselor notes, and review readiness.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <form action={createApplicationAction}>
                      <button type="submit" className={buttonVariants({ variant: "success" })}>
                        <FileText size={16} />
                        Create Application Record
                      </button>
                    </form>
                    <Link href="/admin/admissions/applications" className={buttonVariants({ variant: "outline" })}>
                      View Application Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </AdminSectionCard>

          <AdminSectionCard title="Family Details" description="Primary contact information captured from the public form.">
            <div className="grid gap-5 p-6 md:grid-cols-2">
              <DetailItem label="Parent / Guardian" value={inquiry.parentName} />
              <DetailItem label="Student" value={inquiry.studentName} />
              <DetailItem label="Email" value={inquiry.email} />
              <DetailItem label="Phone" value={inquiry.phone} />
              <DetailItem label="Source Page" value={inquiry.sourcePage} />
              <DetailItem label="Source Path" value={inquiry.sourcePath} />
            </div>
          </AdminSectionCard>

          <AdminSectionCard title="Request Message" description="Original context submitted by the family.">
            <div className="p-6">
              <div className="rounded-2xl border border-border/80 bg-muted/40 p-5">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <Badge variant={getAdmissionStatusBadge(inquiry.status)}>{inquiry.status}</Badge>
                  <Badge variant={inquiry.requestType === "Campus Visit" ? "secondary" : "outline"}>{inquiry.requestType}</Badge>
                  {inquiry.preferredVisitDate ? (
                    <Badge variant="secondary">Visit {formatShortDate(inquiry.preferredVisitDate)}</Badge>
                  ) : null}
                </div>
                <p className="text-sm leading-7 text-foreground">
                  {inquiry.message || "No additional message was submitted with this admissions record."}
                </p>
              </div>
            </div>
          </AdminSectionCard>
        </div>

        <AdminSectionCard title="Workflow Control" description="Update status, visit preferences, and internal notes for the admissions desk.">
          <form action={updateAction} className="space-y-5 p-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Status</label>
              <Select name="status" defaultValue={inquiry.status}>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Visit Requested">Visit Requested</option>
                <option value="Visit Scheduled">Visit Scheduled</option>
                <option value="Application Started">Application Started</option>
                <option value="Closed">Closed</option>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Follow-up Date</label>
                <Input name="followUpDate" type="date" defaultValue={formatDateInput(inquiry.followUpDate)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Preferred Visit Date</label>
                <Input name="preferredVisitDate" type="date" defaultValue={formatDateInput(inquiry.preferredVisitDate)} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Preferred Visit Time</label>
              <Input name="preferredVisitTime" defaultValue={inquiry.preferredVisitTime || ""} placeholder="Morning / Afternoon / Specific time" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Internal Notes</label>
              <Textarea
                name="internalNotes"
                defaultValue={inquiry.internalNotes || ""}
                className="min-h-[180px]"
                placeholder="Call outcomes, parent concerns, next actions, or application notes."
              />
            </div>

            <div className="rounded-2xl border border-border/80 bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
              Updating this form refreshes the admissions register and keeps the backend pipeline aligned with the public inquiry flow.
            </div>

            <div className="flex justify-end">
              <button type="submit" className={buttonVariants({ variant: "default" })}>
                Save Workflow
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
