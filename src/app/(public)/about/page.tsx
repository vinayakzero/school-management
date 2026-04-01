import type { Metadata } from "next";
import CtaBand from "@/components/public/cta-band";
import GalleryStrip from "@/components/public/gallery-strip";
import ImageSplitSection from "@/components/public/image-split-section";
import NarrativeGrid from "@/components/public/narrative-grid";
import PublicHero from "@/components/public/public-hero";
import SectionHeading from "@/components/public/section-heading";
import { admissionsCta, campusVisitCta, imageAssetMap, publicPageHeroes, schoolProfile, type PublicSectionBlock } from "@/lib/public-site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${schoolProfile.name}: philosophy, leadership, school values, and institutional culture.`,
};

const valueBlocks: PublicSectionBlock[] = [
  {
    eyebrow: "Scholarship",
    title: "Deep learning over surface performance",
    description: "The school voice should prioritise thinking, reading, making, and reflection instead of generic excellence claims.",
    icon: "book",
  },
  {
    eyebrow: "Character",
    title: "Calm confidence and responsibility",
    description: "Families should feel that discipline, respect, and independence are part of the school experience from the earliest years onward.",
    icon: "shield",
  },
  {
    eyebrow: "Community",
    title: "Strong belonging with institutional clarity",
    description: "Warmth is present, but the school remains clearly structured and academically serious in all of its public messaging.",
    icon: "users",
  },
];

const milestoneBlocks: PublicSectionBlock[] = [
  {
    eyebrow: "1998",
    title: "Institution founded with a clear academic mission",
    description: "The design language should accommodate trust-building milestones that help visitors understand continuity and credibility.",
    icon: "landmark",
  },
  {
    eyebrow: "2010",
    title: "Campus expansion into new learning environments",
    description: "Milestones are best shown as structured timeline cards instead of dense history copy.",
    icon: "library",
  },
  {
    eyebrow: "2026",
    title: "Public frontend refreshed for a modern institutional identity",
    description: "The new site should connect tradition and present-day confidence through cleaner IA, stronger imagery, and more deliberate motion.",
    icon: "spark",
  },
];

export default function AboutPage() {
  return (
    <>
      <PublicHero
        {...publicPageHeroes.about}
        primaryCta={admissionsCta}
        secondaryCta={campusVisitCta}
      />

      <div className="space-y-24 py-20">
        <section className="mx-auto max-w-7xl space-y-10 px-6 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="School Philosophy"
            title="A public identity that feels established, thoughtful, and visibly led."
            description="The About page should anchor trust. It introduces educational philosophy, the institutional stance, and the kind of campus culture families can expect once they walk in."
          />
          <NarrativeGrid items={valueBlocks} />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <ImageSplitSection
            eyebrow="Leadership Presence"
            title="Leadership should feel active and accountable, not distant or ceremonial."
            description="A principal or school leader message works best when paired with an image that captures the campus culture in motion. The design should make room for a short, high-confidence statement of intent rather than a long letter."
            media={{
              slotId: "about-culture",
              src: imageAssetMap["about-culture"].src,
              alt: imageAssetMap["about-culture"].alt,
            }}
            points={[
              "State what the school stands for in under three paragraphs.",
              "Position leadership around clarity, care, and academic direction.",
              "Use the image slot for a real culture photograph once campus assets are available.",
            ]}
          />
        </section>

        <section className="mx-auto max-w-7xl space-y-10 px-6 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Milestones"
            title="Institutional continuity is easier to trust when it is structured and visible."
            description="The timeline section should stay concise: a few critical milestones, consistent card treatment, and no bloated archival storytelling."
          />
          <NarrativeGrid items={milestoneBlocks} columns={3} />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <GalleryStrip
            eyebrow="Visual Culture"
            title="The About page should feel human through real scenes of study, gathering, and campus rhythm."
            description="A moving visual strip helps the page breathe while reinforcing the editorial tone of the broader frontend."
            images={[
              {
                title: "Learning circle",
                src: imageAssetMap["about-culture"].src,
                alt: imageAssetMap["about-culture"].alt,
              },
              {
                title: "Knowledge spaces",
                src: imageAssetMap.library.src,
                alt: imageAssetMap.library.alt,
              },
              {
                title: "Mentored learning",
                src: imageAssetMap["academics-hero"].src,
                alt: imageAssetMap["academics-hero"].alt,
              },
            ]}
          />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <CtaBand
            eyebrow="Discover The School"
            title="Use the About page to build trust, then move families cleanly toward academics, admissions, and a campus visit."
            description="The frontend should feel like one connected institutional story rather than isolated brochure pages."
            primaryCta={admissionsCta}
            secondaryCta={campusVisitCta}
          />
        </section>
      </div>
    </>
  );
}
