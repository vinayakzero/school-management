import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/public/motion";
import { BadgeRow, HeroImageCard, InlineArrowLink, SectionIntro, StickyMobileCta, ColorCard } from "@/components/public/site-primitives";
import { admissionCta, homeHeroBadges, homeLearningCards, homeShapingCards, homeStats, inquiryCta, schoolProfile } from "@/lib/public-site-v2";

export const metadata: Metadata = {
  description: `${schoolProfile.name} public homepage with the Edukids-inspired theme and admissions-ready actions.`,
};

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="sf-surface paper-grid relative overflow-hidden rounded-[2.8rem] border border-[var(--sf-line)]/70 px-6 py-8 shadow-[0_14px_30px_rgba(61,41,35,0.1)] sm:px-10 sm:py-10">
            <Reveal preset="heroCaption">
              <p className="text-center font-serif text-5xl leading-tight text-[var(--sf-cocoa)] sm:text-6xl lg:text-left">
                Putting your child&apos;s Future
                <br />
                in great motion
              </p>
              <div className="mt-6 flex justify-center lg:justify-start">
                <BadgeRow items={homeHeroBadges} />
              </div>
              <div className="mt-8 flex justify-center lg:justify-start">
                <Link href={admissionCta.href} className="rounded-full bg-[var(--sf-orange)] px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(61,41,35,0.08)] transition hover:-translate-y-1">
                  Start Learning
                </Link>
              </div>
              <p className="mx-auto mt-8 max-w-md text-center text-base leading-7 text-[var(--sf-cocoa-soft)] lg:mx-0 lg:text-left">
                We just don&apos;t give our students only lecture but real life experiences.
              </p>
            </Reveal>

            <div className="mt-8 grid items-end gap-6 sm:grid-cols-2">
              <div className="relative mx-auto w-full max-w-[250px] lg:mx-0">
                <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[color:rgba(77,183,107,0.85)]" />
                <div className="relative overflow-hidden rounded-[2rem]">
                  <Image src={schoolProfile.heroImage} alt="Student learning" width={300} height={380} className="h-[260px] w-full object-cover object-left-top" priority />
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[250px] lg:mx-0 lg:justify-self-end">
                <div className="absolute bottom-0 right-0 h-40 w-40 rounded-t-full rounded-b-[2rem] bg-[color:rgba(247,198,61,0.9)]" />
                <div className="relative overflow-hidden rounded-[2rem]">
                  <Image src={schoolProfile.heroImage} alt="Student smiling" width={300} height={380} className="h-[260px] w-full object-cover object-right-top" priority />
                </div>
              </div>
            </div>

            <div className="mt-10 grid overflow-hidden rounded-[2rem] bg-[var(--sf-cocoa)] text-white md:grid-cols-3">
              {homeStats.map((stat) => (
                <div key={stat.value} className="border-b border-white/10 px-6 py-6 md:border-b-0 md:border-r md:last:border-r-0">
                  <p className="text-4xl font-semibold">{stat.value}</p>
                  <p className="mt-3 text-sm font-semibold">{stat.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/65">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <HeroImageCard />

            <div className="sf-surface rounded-[2.5rem] border border-[var(--sf-line)]/70 p-6 shadow-[0_14px_30px_rgba(61,41,35,0.1)]">
              <SectionIntro
                eyebrow="We focus on one impactful lesson at a time"
                title="Shaping the future of kids"
                description="Short, visual course cards make the public side feel clear and parent-friendly."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {homeShapingCards.map((card) => (
                  <div key={card.title} className="rounded-[1.5rem] bg-white p-4 shadow-[0_18px_45px_rgba(61,41,35,0.08)]">
                    <p className="text-sm font-semibold text-[var(--sf-cocoa)]">{card.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--sf-cocoa-soft)]">{card.eyebrow}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="Smart and clever kids"
            title="Ready to fly high!"
            description="Learn smartly with us. We teach one smart lesson at a time and keep the next action visible."
          />
          <Reveal className="lg:pb-2">
            <InlineArrowLink href={admissionCta.href} label="Enroll Now" />
          </Reveal>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {homeLearningCards.map((card) => (
            <ColorCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="sf-card overflow-hidden bg-[var(--sf-yellow)] p-8 text-[var(--sf-cocoa)]">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--sf-cocoa-soft)]">Confidence that builds a brighter future.</p>
              <h3 className="mt-3 font-serif text-4xl leading-tight">Empower your kids to think smarter and sharper</h3>
              <p className="mt-4 max-w-lg text-base leading-7 text-[var(--sf-cocoa-soft)]">
                Encourage kids to think critically, be creative, and solve problems for a better future.
              </p>
              <Link href={inquiryCta.href} className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--sf-cocoa)] shadow-[0_18px_45px_rgba(61,41,35,0.08)]">
                Get Educated
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <div className="sf-surface overflow-hidden rounded-[2.5rem] border border-[var(--sf-line)]/70 p-4 shadow-[0_14px_30px_rgba(61,41,35,0.1)]">
              <Image src={schoolProfile.heroImage} alt="Happy student" width={900} height={520} className="h-[320px] w-full rounded-[2rem] object-cover object-center" />
            </div>
          </Reveal>
        </div>
      </section>

      <StickyMobileCta primary={admissionCta} secondary={inquiryCta} />
    </>
  );
}
