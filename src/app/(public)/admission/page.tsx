import type { Metadata } from "next";
import { submitAdmissionInquiryAction } from "@/app/public-actions";
import PublicInquiryForm from "@/components/public/public-inquiry-form";
import { ColorCard, CtaRow, FaqList, SectionIntro, StickyMobileCta } from "@/components/public/site-primitives";
import { admissionCta, admissionSteps, faqItems, inquiryCta, schoolProfile } from "@/lib/public-site-v2";

export const metadata: Metadata = {
  title: "Admission",
  description: `Admission form and parent conversion flow for ${schoolProfile.name}.`,
};

function getNotice(searchParams?: { [key: string]: string | string[] | undefined }) {
  const submitted = typeof searchParams?.submitted === "string" ? searchParams.submitted : undefined;
  const error = typeof searchParams?.error === "string" ? searchParams.error : undefined;

  if (submitted === "admission-inquiry") {
    return {
      tone: "success" as const,
      message: "The admission form has been saved and reflected in the admin admissions desk.",
    };
  }

  if (error === "submission-failed") {
    return {
      tone: "error" as const,
      message: "The admission form could not be saved right now. Please try again or contact the school directly.",
    };
  }

  return undefined;
}

export default function AdmissionPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const notice = getNotice(searchParams);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionIntro
              eyebrow="Admission page"
              title="A short, trusted admission journey for new families"
              description="This page is focused on conversion: confidence-building content, a clean form, and clear support actions for parents who are ready to apply."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {admissionSteps.map((step, index) => (
                <div key={step} className="sf-surface rounded-3xl border border-[var(--sf-line)]/70 p-5 shadow-[0_18px_45px_rgba(61,41,35,0.08)]">
                  <p className="text-3xl font-bold text-[var(--sf-cocoa)]">{index + 1}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--sf-cocoa-soft)]">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <PublicInquiryForm
            title="Proceed with admission"
            description="This dynamic form keeps the current project scope intact: submissions are saved to the backend and reflected in admin for follow-up."
            action={submitAdmissionInquiryAction}
            sourcePage="admission"
            sourcePath="/admission"
            requestType="Admission Inquiry"
            submitLabel="Proceed with Admission"
            notice={notice}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <ColorCard card={{ eyebrow: "Trust", title: "Friendly process", description: "Keep admission friendly, not overwhelming, with short form steps and clear human support.", color: "green" }} />
          <ColorCard card={{ eyebrow: "Support", title: "Call or WhatsApp", description: "Parents can move to direct support if they have doubts before submitting the form.", color: "yellow" }} />
          <ColorCard card={{ eyebrow: "Confidence", title: "Fast follow-up", description: "Use this block for next-step reassurance, visit guidance, or document instructions later.", color: "blue" }} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="sf-card rounded-[2.5rem] bg-[var(--sf-cocoa)] p-8 text-white shadow-[0_14px_30px_rgba(61,41,35,0.1)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Admission FAQs</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight">Answer common questions before they become friction</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-white/75">
              <p>Parents often want to know age group, admission timeline, visit timing, and document expectations.</p>
              <p>This page is structured to answer those objections while keeping the form visible and easy to complete.</p>
            </div>
          </div>
          <FaqList items={faqItems.slice(0, 3)} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:pb-24">
        <div className="sf-surface rounded-[2.5rem] border border-[var(--sf-line)]/70 p-8 shadow-[0_18px_45px_rgba(61,41,35,0.08)] sm:p-10">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--sf-orange)]">Need quick support?</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-[var(--sf-cocoa)] sm:text-5xl">Keep a human-friendly path open for every parent</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--sf-cocoa-soft)]">
                Use contact and inquiry shortcuts as a warm fallback for parents who need help before or after admission.
              </p>
            </div>
            <CtaRow primary={admissionCta} secondary={inquiryCta} />
          </div>
        </div>
      </section>

      <StickyMobileCta primary={admissionCta} secondary={inquiryCta} />
    </>
  );
}
