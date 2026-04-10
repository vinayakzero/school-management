import type { Metadata } from "next";
import { CtaRow, SectionIntro, StickyMobileCta, ColorCard } from "@/components/public/site-primitives";
import { admissionCta, contactCards, inquiryCta, schoolProfile } from "@/lib/public-site-v2";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact and visit information for ${schoolProfile.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionIntro
            eyebrow="Contact page"
            title="Keep contact routes visible, warm, and easy to trust"
            description="Use this page for phone, WhatsApp, office hours, campus visit prompts, and a simple map or location placeholder."
          />
          <div className="sf-surface rounded-[2.5rem] border border-[var(--sf-line)]/70 p-8 shadow-[0_14px_30px_rgba(61,41,35,0.1)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((card) => (
                <ColorCard key={card.title} card={card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="sf-surface rounded-[2.5rem] border border-[var(--sf-line)]/70 p-8 shadow-[0_18px_45px_rgba(61,41,35,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--sf-orange)]">Contact blocks</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_18px_45px_rgba(61,41,35,0.08)]">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--sf-cocoa-soft)]">Office</p>
                <p className="mt-2 text-lg font-semibold text-[var(--sf-cocoa)]">School office and reception</p>
              </div>
              <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_18px_45px_rgba(61,41,35,0.08)]">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--sf-cocoa-soft)]">Address</p>
                <p className="mt-2 text-lg font-semibold text-[var(--sf-cocoa)]">{schoolProfile.address}</p>
              </div>
              <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_18px_45px_rgba(61,41,35,0.08)]">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--sf-cocoa-soft)]">Map area</p>
                <p className="mt-2 text-lg font-semibold text-[var(--sf-cocoa)]">Use this block for a future map embed or location card</p>
              </div>
            </div>
          </div>
          <div className="sf-card rounded-[2.5rem] bg-[var(--sf-cocoa)] p-8 text-white shadow-[0_14px_30px_rgba(61,41,35,0.1)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Best action pair</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight">Let parents choose either fast support or direct admission</h2>
            <div className="mt-6">
              <CtaRow primary={admissionCta} secondary={inquiryCta} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:pb-24">
        <div className="sf-surface rounded-[2.5rem] border border-[var(--sf-line)]/70 p-8 shadow-[0_18px_45px_rgba(61,41,35,0.08)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--sf-blue)]">Responsive layout note</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-[var(--sf-cocoa)] sm:text-5xl">This page is designed to stay simple and action-heavy on mobile</h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--sf-cocoa-soft)]">
            On smaller screens the sticky CTA keeps the most likely parent actions visible while the rest of the contact details remain easy to scan and tap.
          </p>
        </div>
      </section>

      <StickyMobileCta primary={admissionCta} secondary={inquiryCta} />
    </>
  );
}
