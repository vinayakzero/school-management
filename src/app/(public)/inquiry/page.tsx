import type { Metadata } from "next";
import { submitAdmissionInquiryAction } from "@/app/public-actions";
import PublicInquiryForm from "@/components/public/public-inquiry-form";
import { ColorCard, ContactActionRow, SectionIntro, StickyMobileCta } from "@/components/public/site-primitives";
import { admissionCta, inquiryCta, inquirySteps, inquirySupportCards, schoolProfile } from "@/lib/public-site-v2";

export const metadata: Metadata = {
  title: "Inquiry",
  description: `Parent inquiry and callback flow for ${schoolProfile.name}.`,
};

function getNotice(searchParams?: { [key: string]: string | string[] | undefined }) {
  const submitted = typeof searchParams?.submitted === "string" ? searchParams.submitted : undefined;
  const error = typeof searchParams?.error === "string" ? searchParams.error : undefined;

  if (submitted === "admission-inquiry") {
    return {
      tone: "success" as const,
      message: "Your inquiry has been saved and is now visible in the admin admissions desk.",
    };
  }

  if (error === "submission-failed") {
    return {
      tone: "error" as const,
      message: "The inquiry could not be saved right now. Please try again or contact the school directly.",
    };
  }

  return undefined;
}

export default function InquiryPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const notice = getNotice(searchParams);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <SectionIntro
              eyebrow="Inquiry page"
              title="Support parents before they decide"
              description="This page is for questions, callbacks, campus visits, and quick support. It lowers friction for parents who are interested but not ready to submit admission details yet."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {inquirySteps.map((step) => (
                <div key={step.value} className="sf-surface rounded-3xl border border-[var(--sf-line)]/70 p-5 shadow-[0_18px_45px_rgba(61,41,35,0.08)]">
                  <p className="text-3xl font-bold text-[var(--sf-cocoa)]">{step.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--sf-cocoa-soft)]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <PublicInquiryForm
            title="Support parents before they apply"
            description="This dynamic form saves parent questions directly to the admin admissions desk so your team can follow up inside the current project flow."
            action={submitAdmissionInquiryAction}
            sourcePage="inquiry"
            sourcePath="/inquiry"
            requestType="Admission Inquiry"
            submitLabel="Submit Inquiry"
            notice={notice}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="sf-card rounded-[2.5rem] bg-[var(--sf-yellow)] p-8 text-[var(--sf-cocoa)] shadow-[0_14px_30px_rgba(61,41,35,0.1)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--sf-cocoa-soft)]">Quick contact bar</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight">Give parents multiple easy ways to move forward</h2>
            <div className="mt-6">
              <ContactActionRow
                links={[
                  { label: "Call now", value: schoolProfile.phone, accent: "var(--sf-orange)" },
                  { label: "WhatsApp help", value: "Instant support route", accent: "var(--sf-green)" },
                  { label: "Campus visit", value: "Book school tour", accent: "var(--sf-cocoa)" },
                ]}
              />
            </div>
          </div>

          <div className="space-y-5">
            {inquirySupportCards.map((card) => (
              <ColorCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:pb-24">
        <div className="sf-card rounded-[2.5rem] bg-[var(--sf-cocoa)] p-8 text-white shadow-[0_14px_30px_rgba(61,41,35,0.1)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Next paths</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Turn curiosity into a clear next action</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
                If the parent is convinced, push them to admission. If they still need confidence, route them to FAQ, highlights, or contact.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href={admissionCta.href} className="rounded-[1.75rem] bg-[var(--sf-orange)] px-5 py-5 text-center text-sm font-semibold text-white">Go to Admission</a>
              <a href="/faq" className="rounded-[1.75rem] bg-white px-5 py-5 text-center text-sm font-semibold text-[var(--sf-cocoa)]">Open FAQ</a>
            </div>
          </div>
        </div>
      </section>

      <StickyMobileCta primary={admissionCta} secondary={inquiryCta} />
    </>
  );
}
