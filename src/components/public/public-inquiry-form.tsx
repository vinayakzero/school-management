import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PublicInquiryFormProps {
  title: string;
  description: string;
  action: (formData: FormData) => Promise<void>;
  sourcePage: "admissions" | "campus";
  sourcePath: "/admissions" | "/campus";
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
    <div className="public-card rounded-[30px] border border-slate-200/80 p-6 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.45)] dark:border-white/10">
      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500 dark:text-slate-400">Admissions desk connected</p>
      <h3 className="mt-4 font-serif text-3xl text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>

      {notice ? (
        <div
          className={`mt-6 rounded-[22px] border px-4 py-3 text-sm font-medium ${
            notice.tone === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
          }`}
        >
          {notice.message}
        </div>
      ) : null}

      <form action={action} className="mt-8 space-y-4">
        <input type="hidden" name="requestType" value={requestType} />
        <input type="hidden" name="sourcePage" value={sourcePage} />
        <input type="hidden" name="sourcePath" value={sourcePath} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-800 dark:text-slate-200">
            Parent / Guardian Name
            <Input name="parentName" required placeholder="Enter full name" className="h-12 rounded-2xl bg-white/80 dark:bg-slate-950/40" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-800 dark:text-slate-200">
            Student Name
            <Input name="studentName" required placeholder="Enter student name" className="h-12 rounded-2xl bg-white/80 dark:bg-slate-950/40" />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-800 dark:text-slate-200">
            Student Grade Interest
            <Input name="studentGradeInterest" required placeholder="Nursery to Grade 12" className="h-12 rounded-2xl bg-white/80 dark:bg-slate-950/40" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-800 dark:text-slate-200">
            Email Address
            <Input name="email" type="email" required placeholder="name@email.com" className="h-12 rounded-2xl bg-white/80 dark:bg-slate-950/40" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-800 dark:text-slate-200">
            Phone Number
            <Input name="phone" type="tel" required placeholder="+91" className="h-12 rounded-2xl bg-white/80 dark:bg-slate-950/40" />
          </label>
        </div>
        {showVisitFields ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-800 dark:text-slate-200">
              Preferred Visit Date
              <Input name="preferredVisitDate" type="date" className="h-12 rounded-2xl bg-white/80 dark:bg-slate-950/40" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-800 dark:text-slate-200">
              Preferred Visit Time
              <Input name="preferredVisitTime" placeholder="Morning / Afternoon / Specific time" className="h-12 rounded-2xl bg-white/80 dark:bg-slate-950/40" />
            </label>
          </div>
        ) : null}
        <label className="space-y-2 text-sm font-medium text-slate-800 dark:text-slate-200">
          What would you like to know?
          <Textarea
            name="message"
            placeholder="Admissions, campus visit, curriculum, transport, or anything else..."
            className="min-h-[150px] rounded-[24px] bg-white/80 dark:bg-slate-950/40"
          />
        </label>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-6 text-slate-500 dark:text-slate-400">
            Submitted requests are saved into the admin admissions desk. Scheduling automation, notifications, and document uploads are still planned for later backend phases.
          </p>
          <Button type="submit" className="h-12 rounded-full bg-slate-950 px-6 text-white hover:bg-slate-900 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
