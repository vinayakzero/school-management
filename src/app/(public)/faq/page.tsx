import type { Metadata } from "next";
import { FaqList, StickyMobileCta, SectionIntro } from "@/components/public/site-primitives";
import { admissionCta, faqItems, inquiryCta, schoolProfile } from "@/lib/public-site-v2";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions for ${schoolProfile.name}.`,
};

export default function FaqPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-20">
        <SectionIntro
          eyebrow="FAQ page"
          title="Answer parent questions without sending them away"
          description="This page handles the most common doubts around admission, inquiry, contact, school visits, and what parents should do next."
          center
        />
      </section>

      <section className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8 lg:pb-24">
        <FaqList items={faqItems} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:pb-24">
        <div className="sf-card rounded-[2.5rem] bg-[var(--sf-cocoa)] p-8 text-white shadow-[0_14px_30px_rgba(61,41,35,0.1)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Need a faster answer?</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Route parents to the right page in one tap</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <a href={admissionCta.href} className="rounded-[1.75rem] bg-[var(--sf-orange)] px-5 py-5 text-center text-sm font-semibold text-white">Admission</a>
              <a href={inquiryCta.href} className="rounded-[1.75rem] bg-white px-5 py-5 text-center text-sm font-semibold text-[var(--sf-cocoa)]">Inquiry</a>
              <a href="/contact" className="rounded-[1.75rem] bg-[var(--sf-green)] px-5 py-5 text-center text-sm font-semibold text-white">Contact</a>
            </div>
          </div>
        </div>
      </section>

      <StickyMobileCta primary={admissionCta} secondary={inquiryCta} />
    </>
  );
}
