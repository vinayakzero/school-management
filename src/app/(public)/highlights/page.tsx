import type { Metadata } from "next";
import { ColorCard, CtaRow, SectionIntro, StickyMobileCta, WhiteInfoCard } from "@/components/public/site-primitives";
import { admissionCta, inquiryCta, highlightCards, highlightHeroCards, schoolProfile } from "@/lib/public-site-v2";

export const metadata: Metadata = {
  title: "Highlights",
  description: `School strengths, campus highlights, and trust-building stories for ${schoolProfile.name}.`,
};

export default function HighlightsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionIntro
            eyebrow="Highlights page"
            title="Turn campus confidence into a visual story parents can trust"
            description="This page is where you show school strengths: safety, teachers, facilities, classroom experience, outcomes, and the full personality of the campus."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {highlightHeroCards.map((card) => (
              <ColorCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {highlightCards.map((card) => (
            <WhiteInfoCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="sf-card rounded-[2.5rem] bg-[var(--sf-cocoa)] p-8 text-white shadow-[0_14px_30px_rgba(61,41,35,0.1)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Campus story</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight">Use highlights to reduce uncertainty and build emotional trust</h2>
            <p className="mt-5 text-base leading-7 text-white/75">
              This is the best place for classroom scenes, facilities, child comfort, events, and the overall school atmosphere.
            </p>
          </div>
          <div className="sf-surface rounded-[2.5rem] border border-[var(--sf-line)]/70 p-8 shadow-[0_18px_45px_rgba(61,41,35,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--sf-orange)]">Next step</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[var(--sf-cocoa)]">After trust comes action</h2>
            <div className="mt-6">
              <CtaRow primary={admissionCta} secondary={inquiryCta} />
            </div>
          </div>
        </div>
      </section>

      <StickyMobileCta primary={admissionCta} secondary={inquiryCta} />
    </>
  );
}
