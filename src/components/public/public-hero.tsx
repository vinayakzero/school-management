"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { PublicCta, PublicHeroPanel, PublicHeroMedia } from "@/lib/public-site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface PublicHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  media: PublicHeroMedia;
  highlights?: string[];
  primaryCta?: PublicCta;
  secondaryCta?: PublicCta;
  panel?: PublicHeroPanel;
  size?: "full" | "page";
}

function getCtaClass(variant: PublicCta["variant"] = "primary") {
  if (variant === "secondary") {
    return cn(
      buttonVariants({ variant: "outline", size: "lg" }),
      "rounded-full border-white/16 bg-white/8 text-white hover:bg-white/14 hover:text-white"
    );
  }

  if (variant === "ghost") {
    return cn(buttonVariants({ variant: "ghost", size: "lg" }), "rounded-full text-white hover:bg-white/10 hover:text-white");
  }

  return cn(buttonVariants({ size: "lg" }), "rounded-full bg-amber-300 text-slate-950 hover:bg-amber-200");
}

export default function PublicHero({
  eyebrow,
  title,
  description,
  media,
  highlights,
  primaryCta,
  secondaryCta,
  panel,
  size = "page",
}: PublicHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={cn("relative overflow-hidden", size === "full" ? "min-h-screen" : "min-h-[78vh]")}>
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(7, 16, 31, 0.78), rgba(7, 16, 31, 0.34)), linear-gradient(180deg, rgba(7, 16, 31, 0.16), rgba(7, 16, 31, 0.62)), url(${media.src})`,
            backgroundPosition: media.focalPoint ?? "center",
          }}
          initial={shouldReduceMotion ? undefined : { scale: 1.06 }}
          animate={shouldReduceMotion ? undefined : { scale: [1.06, 1.02, 1.05], x: [0, 10, -12, 0], y: [0, -6, 10, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,_rgba(217,183,120,0.24),_transparent_24%),radial-gradient(circle_at_82%_22%,_rgba(160,196,255,0.18),_transparent_20%)]" />
        {shouldReduceMotion ? null : (
          <>
            <motion.div
              className="absolute left-[8%] top-[20%] h-40 w-40 rounded-full bg-amber-300/12 blur-3xl"
              animate={{ x: [0, 18, -12, 0], y: [0, -16, 10, 0], scale: [1, 1.08, 0.96, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-[12%] right-[10%] h-56 w-56 rounded-full bg-sky-300/12 blur-3xl"
              animate={{ x: [0, -20, 14, 0], y: [0, 12, -10, 0], scale: [1, 0.94, 1.05, 1] }}
              transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      <div className="relative mx-auto flex max-w-7xl px-6 pb-16 pt-32 sm:px-8 lg:px-10 lg:pb-20 lg:pt-36">
        <div className="grid w-full gap-8 self-end lg:grid-cols-[minmax(0,1.15fr)_320px] lg:items-end">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: -42, y: 26 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="public-glass max-w-3xl rounded-[34px] border border-white/12 p-6 text-white shadow-[0_30px_100px_-56px_rgba(15,23,42,0.75)] sm:p-8 lg:p-10"
          >
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-200/90">{eyebrow}</p>
            ) : null}
            <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.02] text-white sm:text-5xl lg:text-7xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">{description}</p>

            {highlights?.length ? (
              <div className="mt-7 flex flex-wrap gap-3">
                {highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/90"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta ? (
                <Link href={primaryCta.href} className={getCtaClass(primaryCta.variant)}>
                  {primaryCta.label}
                  <ArrowRight size={16} />
                </Link>
              ) : null}
              {secondaryCta ? <Link href={secondaryCta.href} className={getCtaClass(secondaryCta.variant)}>{secondaryCta.label}</Link> : null}
            </div>
          </motion.div>

          {panel ? (
            <motion.aside
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 28 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="public-glass hidden rounded-[30px] border border-white/12 p-6 text-white lg:block"
            >
              {panel.eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-300">{panel.eyebrow}</p> : null}
              <h2 className="mt-3 font-serif text-3xl leading-tight">{panel.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-200">{panel.description}</p>
              {panel.items?.length ? (
                <div className="mt-5 space-y-3">
                  {panel.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-white/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-200" />
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </motion.aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
