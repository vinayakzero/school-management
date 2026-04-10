import type { Metadata } from "next";
import { ColorCard, CtaRow, SectionIntro, StickyMobileCta, WhiteInfoCard } from "@/components/public/site-primitives";
import { admissionCta, inquiryCta, programCards, programHighlights, schoolProfile } from "@/lib/public-site-v2";

export const metadata: Metadata = {
  title: "Programs",
  description: `Programs and learning tracks at ${schoolProfile.name}.`,
};

export default function ProgramsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <SectionIntro
            eyebrow="Programs page"
            title="Curriculum, creativity, and confidence in one colorful page"
            description="Use this page to show age groups, learning tracks, activity-led teaching, and the value parents get from your academic approach."
          />
          <div className="sf-surface paper-grid rounded-[2.5rem] border border-[var(--sf-line)]/70 p-8 shadow-[0_14px_30px_rgba(61,41,35,0.1)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {programHighlights.map((card) => (
                <ColorCard key={card.title} card={card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {programCards.map((card) => (
            <WhiteInfoCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:pb-24">
        <div className="sf-card rounded-[2.5rem] bg-[var(--sf-cocoa)] p-8 text-white shadow-[0_14px_30px_rgba(61,41,35,0.1)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Move next</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Help parents connect programs with action</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
                After the program story, route them toward inquiry if they need answers or admission if they are already convinced.
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
