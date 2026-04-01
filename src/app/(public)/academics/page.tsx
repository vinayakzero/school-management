import type { Metadata } from "next";
import CtaBand from "@/components/public/cta-band";
import ImageSplitSection from "@/components/public/image-split-section";
import NarrativeGrid from "@/components/public/narrative-grid";
import PublicHero from "@/components/public/public-hero";
import SectionHeading from "@/components/public/section-heading";
import StatBand from "@/components/public/stat-band";
import { admissionsCta, campusVisitCta, imageAssetMap, publicPageHeroes, schoolProfile, type PublicSectionBlock } from "@/lib/public-site";

export const metadata: Metadata = {
  title: "Academics",
  description: `Academic overview for ${schoolProfile.name}: curriculum, learning stages, academic environments, and faculty culture.`,
};

const learningStages: PublicSectionBlock[] = [
  {
    eyebrow: "Early Years",
    title: "Foundational curiosity and classroom confidence",
    description: "The youngest learners should be shown in environments where structure and exploration work together.",
    icon: "leaf",
  },
  {
    eyebrow: "Primary School",
    title: "Core literacy, numeracy, and guided independence",
    description: "Academic messaging should show rigour building steadily through routines, reading culture, and teacher presence.",
    icon: "notebook",
  },
  {
    eyebrow: "Middle School",
    title: "Analytical thinking through projects and interdisciplinary work",
    description: "This stage is where students begin applying knowledge with more autonomy, collaboration, and presentation skill.",
    icon: "lightbulb",
  },
  {
    eyebrow: "Senior School",
    title: "Academic depth and future pathways",
    description: "Senior years should feel serious, mentored, and well-supported through labs, subject choice, and guidance.",
    icon: "atom",
  },
];

const academicStats = [
  {
    value: 4,
    suffix: " stages",
    label: "Continuous learning journey",
    description: "A clear academic progression helps families understand how the school grows with the student.",
  },
  {
    value: 8,
    suffix: "+",
    label: "Dedicated learning environments",
    description: "Showcase labs, reading spaces, performance areas, and mentor rooms as part of the learning model.",
  },
  {
    value: 30,
    suffix: "+",
    label: "Faculty-led enrichment tracks",
    description: "This placeholder metric signals extension opportunities beyond core timetables.",
  },
  {
    value: 1,
    prefix: "",
    suffix: " clear academic story",
    label: "Simple to understand",
    description: "The page must explain the school's teaching philosophy without sounding generic or overloaded.",
  },
];

export default function AcademicsPage() {
  return (
    <>
      <PublicHero
        {...publicPageHeroes.academics}
        primaryCta={admissionsCta}
        secondaryCta={campusVisitCta}
      />

      <div className="space-y-24 py-20">
        <section className="mx-auto max-w-7xl space-y-10 px-6 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Learning Journey"
            title="The academics page should explain how teaching changes with age while remaining institutionally coherent."
            description="Visitors should be able to understand the school's academic architecture in one scroll: stage-wise progression, faculty role, learning environments, and student outcomes."
          />
          <NarrativeGrid items={learningStages} columns={4} />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <StatBand items={academicStats} />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <ImageSplitSection
            eyebrow="Faculty & Mentorship"
            title="Teachers should be positioned as visible mentors who bring both subject depth and personal guidance."
            description="A strong academic brand relies on the presence of teachers. The page should show mentor-led classrooms, small-group interaction, and stage-appropriate guidance without drifting into clichés."
            media={{
              slotId: "science-lab",
              src: imageAssetMap["science-lab"].src,
              alt: imageAssetMap["science-lab"].alt,
            }}
            points={[
              "Subject expertise and mentorship appear together in page copy and imagery.",
              "Text blocks stay concise so the page remains visual and readable.",
              "This section is a strong future hook for faculty directory or department-level backend content.",
            ]}
          />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <ImageSplitSection
            eyebrow="Knowledge Environments"
            title="Libraries, labs, and studios must look like working spaces, not decorative amenities."
            description="The site should position facilities as academic infrastructure. Their purpose is to deepen concentration, experimentation, reading, and expression."
            media={{
              slotId: "library",
              src: imageAssetMap.library.src,
              alt: imageAssetMap.library.alt,
            }}
            reverse
            points={[
              "Show reading culture through editorial photography and stronger textual framing.",
              "Present STEM spaces as clean, supervised, and active.",
              "Reserve outcome claims for specific, believable statements instead of vague superlatives.",
            ]}
            cta={{ label: "See Campus Facilities", href: "/campus" }}
          />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <CtaBand
            eyebrow="Academic Confidence"
            title="Once families understand the school's academic model, they should be able to move directly into the admissions flow."
            description="The academics page works best when it builds credibility and then hands off cleanly to inquiry or campus visit actions."
            primaryCta={admissionsCta}
            secondaryCta={campusVisitCta}
          />
        </section>
      </div>
    </>
  );
}
