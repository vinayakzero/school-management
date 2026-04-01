import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { submitAdmissionInquiryAction } from "@/app/public-actions";
import CtaBand from "@/components/public/cta-band";
import ImageSplitSection from "@/components/public/image-split-section";
import NarrativeGrid from "@/components/public/narrative-grid";
import PublicHero from "@/components/public/public-hero";
import PublicInquiryForm from "@/components/public/public-inquiry-form";
import SectionHeading from "@/components/public/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { admissionsCta, campusVisitCta, imageAssetMap, publicPageHeroes, schoolProfile, type PublicSectionBlock } from "@/lib/public-site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admissions",
  description: `Admissions overview for ${schoolProfile.name}: process, documents, eligibility, inquiry, and campus visit flow.`,
};

const admissionsFlow: PublicSectionBlock[] = [
  {
    eyebrow: "Step 1",
    title: "Explore the school and review the entry bands",
    description: "The page should clarify who the school is for before asking families to submit anything.",
    icon: "compass",
  },
  {
    eyebrow: "Step 2",
    title: "Schedule a campus visit or admissions conversation",
    description: "Visits build trust faster than long forms. The frontend should keep this path visible and easy to find.",
    icon: "users",
  },
  {
    eyebrow: "Step 3",
    title: "Prepare documents and complete the inquiry form",
    description: "The inquiry form now saves directly into the admissions desk so staff can follow up without leaving the system.",
    icon: "notebook",
  },
  {
    eyebrow: "Step 4",
    title: "Academic interaction and final decision communication",
    description: "The process closes with clarity and professionalism, avoiding ambiguity around next steps.",
    icon: "shield",
  },
];

const entryBands: PublicSectionBlock[] = [
  {
    eyebrow: "Foundational Entry",
    title: "Nursery to Grade 2",
    description: "Parent interaction, school readiness review, and a calm introduction to the campus environment.",
    icon: "leaf",
  },
  {
    eyebrow: "Progressive Entry",
    title: "Grade 3 to Grade 8",
    description: "Record review, interaction, and age-appropriate academic expectations to ensure continuity in learning.",
    icon: "book",
  },
  {
    eyebrow: "Senior Entry",
    title: "Grade 9 to Grade 12",
    description: "Stronger emphasis on subject alignment, academic history, and pathway readiness.",
    icon: "atom",
  },
];

const faqs = [
  {
    question: "Are admissions forms connected to the backend already?",
    answer:
      "Yes. Admissions inquiries and campus visit requests now save into the admin admissions desk so office staff can track and update them.",
  },
  {
    question: "Can campus visits be scheduled directly from the site?",
    answer:
      "Families can now submit campus visit requests, and the admissions desk can manage them from the admin console. Automated scheduling, calendar confirmation, and notifications remain future work.",
  },
  {
    question: "Will document uploads be supported later?",
    answer:
      "Yes. The admissions information architecture already reserves space for document flow, validation, and secure review once backend modules begin.",
  },
];

function getNotice(searchParams?: { [key: string]: string | string[] | undefined }) {
  const submitted = typeof searchParams?.submitted === "string" ? searchParams.submitted : undefined;
  const error = typeof searchParams?.error === "string" ? searchParams.error : undefined;

  if (submitted === "admission-inquiry") {
    return {
      tone: "success" as const,
      message: "Your admissions inquiry has been saved. The admissions desk can now review and follow up from the admin portal.",
    };
  }

  if (error === "submission-failed") {
    return {
      tone: "error" as const,
      message: "The inquiry could not be saved right now. Please try again or contact the admissions desk directly.",
    };
  }

  return undefined;
}

export default function AdmissionsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const notice = getNotice(searchParams);

  return (
    <>
      <PublicHero
        {...publicPageHeroes.admissions}
        primaryCta={admissionsCta}
        secondaryCta={campusVisitCta}
      />

      <div className="space-y-24 py-20">
        <section className="mx-auto max-w-7xl space-y-10 px-6 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Admissions Process"
            title="The admissions page should remove uncertainty and make the school feel easy to approach."
            description="Families should understand the process, know what to prepare, and feel guided toward either a campus visit or an inquiry without searching across multiple pages."
          />
          <NarrativeGrid items={admissionsFlow} columns={4} />
        </section>

        <section className="mx-auto max-w-7xl space-y-10 px-6 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Entry Bands"
            title="Present age-specific entry expectations with calm clarity."
            description="Short, readable cards work better than long policy blocks. This makes the admissions journey feel premium and understandable."
          />
          <NarrativeGrid items={entryBands} columns={3} />
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <ImageSplitSection
            eyebrow="Documents & Readiness"
            title="Families should know what to prepare before they ever reach the campus."
            description="Use this section to set expectations around academic records, identity proof, previous school details, and any age-specific or program-specific information."
            media={{
              slotId: "admissions-conversation",
              src: imageAssetMap["admissions-conversation"].src,
              alt: imageAssetMap["admissions-conversation"].alt,
            }}
            points={[
              "Student birth certificate or identity proof",
              "Previous academic records and transfer documents where relevant",
              "Parent identification, address proof, and contact details",
              "Any programme-specific information requested by the admissions office",
            ]}
          />
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_0.9fr] lg:px-10">
          <PublicInquiryForm
            title="Admissions inquiry form"
            description="Families can now submit a real inquiry that is stored in the admissions desk for staff review, follow-up, and pipeline tracking."
            action={submitAdmissionInquiryAction}
            sourcePage="admissions"
            sourcePath="/admissions"
            requestType="Admission Inquiry"
            submitLabel="Send Inquiry"
            notice={notice}
          />

          <div className="space-y-6">
            <div className="public-card rounded-[30px] border border-slate-200/80 p-6 dark:border-white/10">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500 dark:text-slate-400">Plan a visit</p>
              <h3 className="mt-4 font-serif text-3xl text-slate-950 dark:text-white">Campus visit request</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Families can move from reading about the school to submitting a visit request, while the admissions team handles confirmation from the backend console.
              </p>
              <div className="mt-6 rounded-[24px] border border-slate-200/80 bg-slate-950 px-5 py-5 text-white dark:border-white/10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200">Visit desk</p>
                <p className="mt-3 text-lg font-semibold">{schoolProfile.phone}</p>
                <p className="mt-1 text-sm text-slate-300">{schoolProfile.email}</p>
                <p className="mt-4 text-sm leading-7 text-slate-300">{schoolProfile.visitHours}</p>
              </div>
              <Link
                href={campusVisitCta.href}
                className={cn(buttonVariants({ size: "lg" }), "mt-6 rounded-full bg-slate-950 text-white hover:bg-slate-900 dark:bg-white dark:text-slate-950")}
              >
                {campusVisitCta.label}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="public-card rounded-[30px] border border-slate-200/80 p-6 dark:border-white/10">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500 dark:text-slate-400">Questions</p>
              <div className="mt-4 space-y-4">
                {faqs.map((faq) => (
                  <details key={faq.question} className="rounded-[22px] border border-slate-200/80 bg-white/80 p-5 dark:border-white/10 dark:bg-slate-950/30">
                    <summary className="cursor-pointer list-none text-base font-semibold text-slate-950 dark:text-white">{faq.question}</summary>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <CtaBand
            eyebrow="Next Step"
            title="Admissions should stay prominent, but never feel pushy or hurried."
            description="The public frontend earns trust through clarity, then offers inquiry and campus visit actions at predictable moments."
            primaryCta={admissionsCta}
            secondaryCta={campusVisitCta}
          />
        </section>
      </div>
    </>
  );
}
