"use client";

import type { LucideIcon } from "lucide-react";
import {
  Atom,
  BookOpen,
  Compass,
  HeartHandshake,
  Landmark,
  Leaf,
  LibraryBig,
  Lightbulb,
  Microscope,
  Music4,
  NotebookTabs,
  ShieldCheck,
  Sparkles,
  Trophy,
  BusFront,
  Users,
} from "lucide-react";
import { HoverCard, Reveal } from "./motion";
import type { PublicSectionBlock, PublicIconKey } from "@/lib/public-site";

const iconMap: Record<PublicIconKey, LucideIcon> = {
  atom: Atom,
  book: BookOpen,
  compass: Compass,
  heart: HeartHandshake,
  landmark: Landmark,
  leaf: Leaf,
  library: LibraryBig,
  lightbulb: Lightbulb,
  microscope: Microscope,
  music: Music4,
  notebook: NotebookTabs,
  shield: ShieldCheck,
  spark: Sparkles,
  sports: Trophy,
  transport: BusFront,
  users: Users,
};

interface NarrativeGridProps {
  items: PublicSectionBlock[];
  columns?: 2 | 3 | 4;
}

export default function NarrativeGrid({ items, columns = 3 }: NarrativeGridProps) {
  const gridClass =
    columns === 4 ? "xl:grid-cols-4" : columns === 2 ? "lg:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3";

  return (
    <div className={`grid gap-5 ${gridClass}`}>
      {items.map((item, index) => {
        const Icon = item.icon ? iconMap[item.icon] : Sparkles;

        return (
          <Reveal key={item.title} delay={index * 0.08}>
            <HoverCard className="h-full">
              <article className="public-card h-full rounded-[28px] border border-slate-200/75 p-6 dark:border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-amber-200 dark:bg-white dark:text-slate-950">
                  <Icon size={20} />
                </div>
                {item.eyebrow ? (
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                    {item.eyebrow}
                  </p>
                ) : null}
                <h3 className="mt-3 font-serif text-2xl text-slate-950 dark:text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              </article>
            </HoverCard>
          </Reveal>
        );
      })}
    </div>
  );
}
