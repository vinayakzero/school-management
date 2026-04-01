"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PublicCta, PublicHeroMedia } from "@/lib/public-site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "./motion";

interface ImageSplitSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  points?: string[];
  media: PublicHeroMedia;
  reverse?: boolean;
  cta?: PublicCta;
}

export default function ImageSplitSection({
  eyebrow,
  title,
  description,
  points,
  media,
  reverse = false,
  cta,
}: ImageSplitSectionProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-2 lg:items-center">
      <Reveal className={cn(reverse ? "lg:order-2" : "")}>
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200/80 shadow-[0_30px_80px_-52px_rgba(15,23,42,0.45)] dark:border-white/10">
          <div className="relative h-[420px] w-full">
            <Image src={media.src} alt={media.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(15,23,42,0.04),_rgba(15,23,42,0.18))]" />
          <div className="absolute inset-x-4 bottom-4 rounded-[24px] border border-white/14 bg-slate-950/60 px-5 py-4 text-sm text-white backdrop-blur-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-200">Asset slot</p>
            <p className="mt-1">{media.slotId}</p>
          </div>
        </div>
      </Reveal>

      <Reveal className={cn("public-shell-line pl-0 lg:pl-8", reverse ? "lg:order-1" : "")} delay={0.12}>
        <div className="pl-0 lg:pl-8">
          {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500 dark:text-slate-400">{eyebrow}</p> : null}
          <h2 className="mt-4 font-serif text-3xl leading-tight text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">{description}</p>

          {points?.length ? (
            <div className="mt-6 space-y-4">
              {points.map((point) => (
                <div key={point} className="flex items-start gap-3 text-sm leading-7 text-slate-700 dark:text-slate-200">
                  <span className="mt-3 h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          ) : null}

          {cta ? (
            <Link
              href={cta.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 rounded-full bg-slate-950 text-white hover:bg-slate-900 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              )}
            >
              {cta.label}
              <ArrowRight size={16} />
            </Link>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
