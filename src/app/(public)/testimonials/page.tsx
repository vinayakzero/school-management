import type { Metadata } from "next";
import { CtaRow, SectionIntro, StickyMobileCta, TestimonialPanel } from "@/components/public/site-primitives";
import { admissionCta, inquiryCta, schoolProfile, testimonialCards, testimonialStats } from "@/lib/public-site-v2";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `Parent trust and proof-style storytelling for ${schoolProfile.name}.`,
};

export default function TestimonialsPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-20">
        <SectionIntro
          eyebrow="Testimonials page"
          title="Show parent trust as a full landing-page story"
          description="This page collects review-style proof, confidence signals, and trust metrics in one place so hesitant parents can feel reassured before they move forward."
          center
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonialCards.map((item) => (
            <TestimonialPanel key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {testimonialStats.map((stat) => (
            <div key={stat.value} className="sf-surface rounded-[2rem] border border-[var(--sf-line)]/70 p-6 shadow-[0_18px_45px_rgba(61,41,35,0.08)]">
              <p className="text-4xl font-bold text-[var(--sf-cocoa)]">{stat.value}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--sf-cocoa-soft)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="sf-surface rounded-[2.5rem] border border-[var(--sf-line)]/70 p-8 shadow-[0_18px_45px_rgba(61,41,35,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--sf-orange)]">Trust path</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[var(--sf-cocoa)]">Use testimonials to remove hesitation</h2>
            <p className="mt-5 text-base leading-7 text-[var(--sf-cocoa-soft)]">
              When parents are not ready to submit a form, social proof often becomes the page that shifts them from uncertainty to action.
            </p>
          </div>
          <div className="sf-card rounded-[2.5rem] bg-[var(--sf-cocoa)] p-8 text-white shadow-[0_14px_30px_rgba(61,41,35,0.1)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Action row</p>
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
