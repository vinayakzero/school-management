import type { Metadata } from "next";
import CtaBand from "@/components/public/cta-band";
import GalleryStrip from "@/components/public/gallery-strip";
import ImageSplitSection from "@/components/public/image-split-section";
import NarrativeGrid from "@/components/public/narrative-grid";
import PublicHero from "@/components/public/public-hero";
import SectionHeading from "@/components/public/section-heading";
import StatBand from "@/components/public/stat-band";
import { admissionsCta, campusVisitCta, imageAssetMap, publicPageHeroes, schoolProfile, type PublicSectionBlock } from "@/lib/public-site";

export const metadata: Metadata = {
  description: `${schoolProfile.name} public homepage concept focused on institutional storytelling, academics, and admissions.`,
};

const institutionalPillars: PublicSectionBlock[] = [
  {
    eyebrow: "Academic Character",
    title: "Scholarly learning with visible structure",
    description: "The homepage should communicate that classroom rigour, faculty presence, and intellectual discipline are central to school identity.",
    icon: "book",
  },
  {
    eyebrow: "Activity & Belonging",
    title: "A campus that feels active all day",
    description: "Student life is presented as purposeful activity: clubs, arts, athletics, and leadership all operating inside a clear institutional rhythm.",
    icon: "spark",
  },
  {
    eyebrow: "Future Readiness",
    title: "Spaces that prepare students for what comes next",
    description: "Learning environments, labs, libraries, and mentorship show the school as future-aware without drifting into vague claims.",
    icon: "lightbulb",
  },
];

const homeStats = [
  {
    value: 28,
    suffix: "+",
    label: "Years of institutional continuity",
    description: "A placeholder proof point for long-term academic trust and established school culture.",
  },
  {
    value: 12,
    prefix: "1:",
    label: "Mentor guidance ratio",
    description: "Represents the close academic and pastoral attention the public site should imply.",
  },
  {
    value: 40,
    suffix: "+",
    label: "Clubs and activity formats",
    description: "Signals that student life extends beyond a timetable into a sustained culture of participation.",
  },
  {
    value: 100,
    suffix: "%",
    label: "Admissions-first conversion readiness",
    description: "Every major section should support inquiry, confidence, and the next step toward a campus visit.",
  },
];

export default function HomePage() {
  return (
    <>
      <PublicHero
        {...publicPageHeroes.home}
        size="full"
        primaryCta={admissionsCta}
        secondaryCta={campusVisitCta}
      />

      <div className="relative z-10 -mt-10 space-y-24 pb-24">
        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <StatBand items={homeStats} />
        </section>

        <section className="mx-auto max-w-7xl space-y-10 px-6 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Institutional Promise"
            title="A first impression built on confidence, scholarship, and calm visual authority."
            description="The homepage is not a brochure wall. It is a sequence of photographic scenes, disciplined typography, and precise motion cues that help families trust the institution quickly."
          />
          <NarrativeGrid items={institutionalPillars} />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <ImageSplitSection
            eyebrow="Academic Depth"
            title="The site should make knowledge work visible through classrooms, reading spaces, and mentor-led learning moments."
            description="Rather than listing claims, the public frontend uses image-led sections to show what scholarship looks like on campus: concentrated learning, thoughtful spaces, and clear academic progression."
            media={{
              slotId: "library",
              src: imageAssetMap.library.src,
              alt: imageAssetMap.library.alt,
            }}
            points={[
              "A curriculum story that feels rigorous without becoming cold or overloaded.",
              "Large-format media framed by editorial text blocks and restrained interface chrome.",
              "Messaging that reassures parents while still speaking to aspiration and future-readiness.",
            ]}
            cta={{ label: "Explore Academics", href: "/academics" }}
          />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <ImageSplitSection
            eyebrow="Student Life"
            title="Co-curricular culture is positioned as a disciplined extension of learning, not an afterthought."
            description="Athletics, arts, clubs, and leadership spaces are shown as active and mentored environments where students build identity, confidence, and community."
            media={{
              slotId: "student-life-hero",
              src: imageAssetMap["student-life-hero"].src,
              alt: imageAssetMap["student-life-hero"].alt,
            }}
            reverse
            points={[
              "A gallery-led narrative makes the campus feel in motion without over-animating every surface.",
              "The design keeps activity energetic but still formal enough to command as an institution.",
              "The resulting tone is modern and alive, not playful or startup-like.",
            ]}
            cta={{ label: "View Student Life", href: "/student-life" }}
          />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <GalleryStrip
            eyebrow="Visual Language"
            title="Photographic storytelling should feel immersive, editorial, and easy to replace with real campus imagery later."
            description="The placeholder media strategy is intentionally swap-ready: full-width hero images, sectional editorial frames, and a moving gallery band that keeps the site feeling alive."
            images={[
              {
                title: "Campus movement",
                src: imageAssetMap["home-hero"].src,
                alt: imageAssetMap["home-hero"].alt,
              },
              {
                title: "Collaborative culture",
                src: imageAssetMap["about-culture"].src,
                alt: imageAssetMap["about-culture"].alt,
              },
              {
                title: "Knowledge spaces",
                src: imageAssetMap.library.src,
                alt: imageAssetMap.library.alt,
              },
            ]}
          />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <CtaBand
            eyebrow="Admissions First"
            title="Families should always know the next step: understand the school, visit the campus, and begin the admissions journey."
            description="This CTA pattern stays present across header, hero, content sections, and footer so the public frontend feels premium without losing conversion clarity."
            primaryCta={admissionsCta}
            secondaryCta={campusVisitCta}
          />
        </section>
      </div>
    </>
  );
}
