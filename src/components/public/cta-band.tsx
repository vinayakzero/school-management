"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { PublicCta } from "@/lib/public-site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "./motion";

interface CtaBandProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta: PublicCta;
  secondaryCta?: PublicCta;
}

export default function CtaBand({ eyebrow, title, description, primaryCta, secondaryCta }: CtaBandProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Reveal>
      <section className="relative overflow-hidden rounded-[34px] border border-slate-200/70 bg-slate-950 px-6 py-10 text-white shadow-[0_34px_90px_-58px_rgba(15,23,42,0.6)] sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(217,183,120,0.26),_transparent_28%),radial-gradient(circle_at_85%_20%,_rgba(125,211,252,0.16),_transparent_26%)]" />
        {shouldReduceMotion ? null : (
          <motion.div
            className="absolute inset-y-0 left-[-20%] w-1/2 bg-[linear-gradient(90deg,_transparent,_rgba(255,255,255,0.08),_transparent)]"
            animate={{ x: ["0%", "210%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        )}
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-200">{eyebrow}</p> : null}
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mt-5 text-base leading-8 text-slate-200">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={primaryCta.href} className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-amber-300 text-slate-950 hover:bg-amber-200")}>
              {primaryCta.label}
              <ArrowRight size={16} />
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-white/14 bg-white/8 text-white hover:bg-white/14 hover:text-white"
                )}
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
