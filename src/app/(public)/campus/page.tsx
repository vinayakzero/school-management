import type { Metadata } from "next";
import { submitCampusVisitAction } from "@/app/public-actions";
import CtaBand from "@/components/public/cta-band";
import ImageSplitSection from "@/components/public/image-split-section";
import NarrativeGrid from "@/components/public/narrative-grid";
import PublicHero from "@/components/public/public-hero";
import PublicInquiryForm from "@/components/public/public-inquiry-form";
import SectionHeading from "@/components/public/section-heading";
import { admissionsCta, campusVisitCta, imageAssetMap, publicPageHeroes, schoolProfile, type PublicSectionBlock } from "@/lib/public-site";

export const metadata: Metadata = {
  title: "Campus & Facilities",
  description: `Campus, facilities, safety, transport, and visit information for ${schoolProfile.name}.`,
};

const campusBlocks: PublicSectionBlock[] = [
  {
    eyebrow: "Classrooms",
    title: "Learning spaces designed for calm concentration",
    description: "The campus story should begin with spaces where students and faculty can focus without clutter or visual noise.",
    icon: "book",
  },
  {
    eyebrow: "Labs & Studios",
    title: "Specialised environments for experimentation and expression",
    description: "These spaces prove that the school invests in applied learning, not only classroom instruction.",
    icon: "microscope",
  },
  {
    eyebrow: "Library",
    title: "Knowledge spaces that anchor reading culture",
    description: "The library should feel central to the institution, not peripheral to it.",
    icon: "library",
  },
  {
    eyebrow: "Safety & Movement",
    title: "Secure circulation, supervision, and transport systems",
    description: "Parents need to see that the campus is ready, responsible, and easy to navigate.",
    icon: "transport",
  },
];

function getNotice(searchParams?: { [key: string]: string | string[] | undefined }) {
  const submitted = typeof searchParams?.submitted === "string" ? searchParams.submitted : undefined;
  const error = typeof searchParams?.error === "string" ? searchParams.error : undefined;

  if (submitted === "campus-visit") {
    return {
      tone: "success" as const,
      message: "Your campus visit request has been saved. The admissions desk can now review preferred timing and follow up.",
    };
  }

  if (error === "submission-failed") {
    return {
      tone: "error" as const,
      message: "The campus visit request could not be saved right now. Please try again or contact the admissions desk directly.",
    };
  }

  return undefined;
}

export default function CampusPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const notice = getNotice(searchParams);

  return (
    <>
      <PublicHero
        {...publicPageHeroes.campus}
        primaryCta={campusVisitCta}
        secondaryCta={admissionsCta}
      />

      <div className="space-y-24 py-20">
        <section className="mx-auto max-w-7xl space-y-10 px-6 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Campus Overview"
            title="Campus pages work best when they help families picture a real school day."
            description="This page should bring together architecture, academic infrastructure, student support, transport readiness, and visit planning in one confident flow."
          />
          <NarrativeGrid items={campusBlocks} columns={4} />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <ImageSplitSection
            eyebrow="Learning Infrastructure"
            title="Facilities should be shown as tools for better learning, not stand-alone claims."
            description="Use large-format media to connect classrooms, labs, and library environments back to the school's academic promise."
            media={{
              slotId: "science-lab",
              src: imageAssetMap["science-lab"].src,
              alt: imageAssetMap["science-lab"].alt,
            }}
            points={[
              "Pair infrastructure photography with short, high-trust captions.",
              "Keep the layout spacious so the images feel premium and architectural.",
              "Reserve room for future dynamic campus modules if backend media collections are introduced later.",
            ]}
          />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <ImageSplitSection
            eyebrow="Safety & Daily Operations"
            title="Families should understand supervision, transport access, and campus movement in one section."
            description="The public frontend should explain practical campus concerns with the same design quality as the aspirational sections. That balance increases trust."
            media={{
              slotId: "campus-hero",
              src: imageAssetMap["campus-hero"].src,
              alt: imageAssetMap["campus-hero"].alt,
            }}
            reverse
            points={[
              "Transport routes, arrival windows, and pickup systems can be introduced here in backend phase two.",
              "A dedicated visit CTA belongs on this page and in the footer.",
              "Contact information should remain visible without turning the page into a plain utility screen.",
            ]}
          />
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 sm:px-8 lg:grid-cols-[0.9fr_minmax(0,1.1fr)] lg:px-10">
          <div className="public-card rounded-[30px] border border-slate-200/80 p-6 dark:border-white/10">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500 dark:text-slate-400">Visit information</p>
            <h3 className="mt-4 font-serif text-3xl text-slate-950 dark:text-white">Campus contact and location</h3>
            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <div>
                <p className="font-semibold text-slate-950 dark:text-white">Address</p>
                <p>{schoolProfile.address}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-950 dark:text-white">Admissions Desk</p>
                <p>{schoolProfile.phone}</p>
                <p>{schoolProfile.email}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-950 dark:text-white">Visit Hours</p>
                <p>{schoolProfile.visitHours}</p>
              </div>
            </div>
            <div className="mt-8 overflow-hidden rounded-[24px] border border-slate-200/80 bg-[linear-gradient(160deg,_rgba(15,23,42,0.92),_rgba(30,41,59,0.82))] p-6 text-white dark:border-white/10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200">Map placeholder</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Replace this block with an embedded map, travel instructions, and campus visit scheduling integration when backend-connected public workflows begin.
              </p>
            </div>
          </div>

          <PublicInquiryForm
            title="Plan your campus visit"
            description="This request form now stores campus visit leads in the admissions desk so your team can coordinate follow-up and scheduling."
            action={submitCampusVisitAction}
            sourcePage="campus"
            sourcePath="/campus"
            requestType="Campus Visit"
            submitLabel="Request Campus Visit"
            showVisitFields
            notice={notice}
          />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <CtaBand
            eyebrow="Visit The Campus"
            title="The campus page is the public frontend's bridge between visual trust and real-world action."
            description="It should leave families with a clear sense of place, readiness, and how to take the next step with confidence."
            primaryCta={campusVisitCta}
            secondaryCta={admissionsCta}
          />
        </section>
      </div>
    </>
  );
}
