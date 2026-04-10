import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PublicInquiryFormProps {
  title: string;
  description: string;
  action: (formData: FormData) => Promise<void>;
  sourcePage: "admissions" | "campus" | "admission" | "inquiry";
  sourcePath: "/admissions" | "/campus" | "/admission" | "/inquiry";
  requestType: "Admission Inquiry" | "Campus Visit";
  submitLabel?: string;
  showVisitFields?: boolean;
  notice?: {
    tone: "success" | "error";
    message: string;
  };
}

export default function PublicInquiryForm({
  title,
  description,
  action,
  sourcePage,
  sourcePath,
  requestType,
  submitLabel = "Submit Inquiry",
  showVisitFields = false,
  notice,
}: PublicInquiryFormProps) {
  return (
    <div className="sf-surface rounded-[2.5rem] border border-[var(--sf-line)]/70 p-6 shadow-[0_14px_30px_rgba(61,41,35,0.1)] sm:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[color:rgba(255,123,61,0.1)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--sf-orange)]">
          {requestType === "Campus Visit" ? "Plan a visit" : "Ask before applying"}
        </span>
        <span className="rounded-full bg-[color:rgba(91,166,230,0.1)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--sf-blue)]">
          Dynamic form
        </span>
      </div>
      <h3 className="font-serif text-4xl leading-tight text-[var(--sf-cocoa)]">{title}</h3>
      <p className="mt-4 text-base leading-7 text-[var(--sf-cocoa-soft)]">{description}</p>

      {notice ? (
        <div
          className={`mt-6 rounded-[22px] border px-4 py-3 text-sm font-medium ${
            notice.tone === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {notice.message}
        </div>
      ) : null}

      <form action={action} className="mt-8 space-y-4">
        <input type="hidden" name="requestType" value={requestType} />
        <input type="hidden" name="sourcePage" value={sourcePage} />
        <input type="hidden" name="sourcePath" value={sourcePath} />
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-[var(--sf-cocoa)]">
            Parent / Guardian Name
            <Input name="parentName" required placeholder="Enter full name" className="focus-field mt-2 h-12 rounded-2xl border-[var(--sf-line)] bg-[var(--sf-paper)]" />
          </label>
          <label className="block text-sm font-semibold text-[var(--sf-cocoa)]">
            Student Name
            <Input name="studentName" required placeholder="Enter student name" className="focus-field mt-2 h-12 rounded-2xl border-[var(--sf-line)] bg-[var(--sf-paper)]" />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-[var(--sf-cocoa)]">
            Student Grade Interest
            <Input name="studentGradeInterest" required placeholder="Nursery to Grade 12" className="focus-field mt-2 h-12 rounded-2xl border-[var(--sf-line)] bg-[var(--sf-paper)]" />
          </label>
          <label className="block text-sm font-semibold text-[var(--sf-cocoa)]">
            Email Address
            <Input name="email" type="email" required placeholder="name@email.com" className="focus-field mt-2 h-12 rounded-2xl border-[var(--sf-line)] bg-[var(--sf-paper)]" />
          </label>
          <label className="block text-sm font-semibold text-[var(--sf-cocoa)]">
            Phone Number
            <Input name="phone" type="tel" required placeholder="+91" className="focus-field mt-2 h-12 rounded-2xl border-[var(--sf-line)] bg-[var(--sf-paper)]" />
          </label>
        </div>
        {showVisitFields ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-[var(--sf-cocoa)]">
              Preferred Visit Date
              <Input name="preferredVisitDate" type="date" className="focus-field mt-2 h-12 rounded-2xl border-[var(--sf-line)] bg-[var(--sf-paper)]" />
            </label>
            <label className="block text-sm font-semibold text-[var(--sf-cocoa)]">
              Preferred Visit Time
              <Input name="preferredVisitTime" placeholder="Morning / Afternoon / Specific time" className="focus-field mt-2 h-12 rounded-2xl border-[var(--sf-line)] bg-[var(--sf-paper)]" />
            </label>
          </div>
        ) : null}
        <label className="block text-sm font-semibold text-[var(--sf-cocoa)]">
          What would you like to know?
          <Textarea
            name="message"
            placeholder="Admissions, campus visit, curriculum, transport, or anything else..."
            className="focus-field mt-2 min-h-[150px] rounded-[24px] border-[var(--sf-line)] bg-[var(--sf-paper)]"
          />
        </label>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-6 text-[var(--sf-cocoa-soft)]">
            Submitted requests are saved into the admin admissions desk and reflected in the current project workflow.
          </p>
          <Button type="submit" className="h-12 rounded-full bg-[var(--sf-orange)] px-6 text-white hover:bg-[var(--sf-cocoa)]">
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
