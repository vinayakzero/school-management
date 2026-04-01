import type { Metadata } from "next";
import CtaBand from "@/components/public/cta-band";
import GalleryStrip from "@/components/public/gallery-strip";
import ImageSplitSection from "@/components/public/image-split-section";
import NarrativeGrid from "@/components/public/narrative-grid";
import PublicHero from "@/components/public/public-hero";
import SectionHeading from "@/components/public/section-heading";
import { admissionsCta, campusVisitCta, imageAssetMap, publicPageHeroes, schoolProfile, type PublicSectionBlock } from "@/lib/public-site";

export const metadata: Metadata = {
  title: "Student Life",
  description: `Student life at ${schoolProfile.name}: activities, sport, arts, leadership, and wellbeing.`,
};

const studentLifeBlocks: PublicSectionBlock[] = [
  {
    eyebrow: "Clubs",
    title: "Student-led curiosity outside the classroom",
    description: "Clubs should feel mentored and serious enough to match the school's institutional tone.",
    icon: "spark",
  },
  {
    eyebrow: "Sport",
    title: "Athletics with discipline and team culture",
    description: "The narrative should show structured participation, not only event-day performance.",
    icon: "sports",
  },
  {
    eyebrow: "Arts",
    title: "Performance, design, and creative confidence",
    description: "Arts spaces belong inside the core identity of the school, not as decorative extras.",
    icon: "music",
  },
  {
    eyebrow: "Leadership",
    title: "Opportunities for voice, service, and initiative",
    description: "A strong school experience creates room for students to contribute to campus life visibly.",
    icon: "compass",
  },
];

export default function StudentLifePage() {
  return (
    <>
      <PublicHero
        {...publicPageHeroes.studentLife}
        primaryCta={admissionsCta}
        secondaryCta={campusVisitCta}
      />

      <div className="space-y-24 py-20">
        <section className="mx-auto max-w-7xl space-y-10 px-6 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Life On Campus"
            title="Student life should feel energetic, but always directed by a larger educational purpose."
            description="This page balances vibrancy and institutional discipline. It shows that students belong to an active campus where participation is guided, visible, and development-focused."
          />
          <NarrativeGrid items={studentLifeBlocks} columns={4} />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <ImageSplitSection
            eyebrow="Wellbeing & Support"
            title="Pastoral care is strongest when it feels embedded into everyday school rhythm."
            description="Wellbeing, counselling access, advisory systems, and mentor support should appear as part of the student's everyday environment rather than as emergency-only services."
            media={{
              slotId: "wellbeing",
              src: imageAssetMap.wellbeing.src,
              alt: imageAssetMap.wellbeing.alt,
            }}
            points={[
              "Show support as calm, structured, and accessible.",
              "Balance emotional care language with the school's wider academic seriousness.",
              "Reserve room for future backend hooks such as event sign-ups, house systems, and student clubs.",
            ]}
          />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <GalleryStrip
            eyebrow="Activity Narrative"
            title="A motion-led gallery band gives the student life page energy without making it feel noisy."
            description="This section is where the site can feel most alive: arts, clubs, performance, sport, and informal campus moments stitched together in one visual rhythm."
            images={[
              {
                title: "Activity culture",
                src: imageAssetMap["student-life-hero"].src,
                alt: imageAssetMap["student-life-hero"].alt,
              },
              {
                title: "Arts",
                src: imageAssetMap["arts-culture"].src,
                alt: imageAssetMap["arts-culture"].alt,
              },
              {
                title: "Wellbeing",
                src: imageAssetMap.wellbeing.src,
                alt: imageAssetMap.wellbeing.alt,
              },
            ]}
          />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <CtaBand
            eyebrow="See The School In Action"
            title="Student life pages build emotion. The call to action should translate that emotion into a campus visit or admissions inquiry."
            description="This is where visual richness and conversion intent meet; the page should stay expressive but always clear about the next step."
            primaryCta={admissionsCta}
            secondaryCta={campusVisitCta}
          />
        </section>
      </div>
    </>
  );
}
