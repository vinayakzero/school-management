"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { HoverCard, Reveal } from "./motion";
import { cn } from "@/lib/utils";
import type { FeatureCard, FaqItem, PublicCta, TestimonialItem } from "@/lib/public-site-v2";

export function SectionIntro({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
}) {
  return (
    <Reveal className={cn(center ? "mx-auto max-w-3xl text-center" : "max-w-2xl")}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--sf-orange)]">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-4xl leading-tight text-[var(--sf-cocoa)] sm:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-[var(--sf-cocoa-soft)]">{description}</p>
    </Reveal>
  );
}

export function ColorCard({ card, className }: { card: FeatureCard; className?: string }) {
  return (
    <HoverCard className={className}>
      <div className={cn("sf-card h-full p-6", colorClassName(card.color))}>
        <p className={cn("text-sm font-semibold uppercase tracking-[0.16em]", card.color === "white" || card.color === "yellow" ? "text-[var(--sf-cocoa-soft)]" : "text-white/85")}>
          {card.eyebrow}
        </p>
        <h3 className="mt-3 font-serif text-3xl leading-tight">{card.title}</h3>
        {card.description ? <p className={cn("mt-4 text-sm leading-7", card.color === "white" || card.color === "yellow" ? "text-[var(--sf-cocoa-soft)]" : "text-white/85")}>{card.description}</p> : null}
      </div>
    </HoverCard>
  );
}

export function WhiteInfoCard({ card }: { card: FeatureCard }) {
  return (
    <Reveal>
      <HoverCard>
        <div className="sf-surface h-full rounded-[2rem] border border-[var(--sf-line)]/70 p-6 shadow-[0_18px_45px_rgba(61,41,35,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--sf-orange)]">{card.eyebrow}</p>
          <h3 className="mt-3 font-serif text-3xl leading-tight text-[var(--sf-cocoa)]">{card.title}</h3>
          {card.description ? <p className="mt-4 text-sm leading-7 text-[var(--sf-cocoa-soft)]">{card.description}</p> : null}
        </div>
      </HoverCard>
    </Reveal>
  );
}

export function TestimonialPanel({ item }: { item: TestimonialItem }) {
  return (
    <Reveal>
      <HoverCard>
        <div className={cn("sf-card h-full p-6 text-white", colorClassName(item.color))}>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/85">Parent voice</p>
          <h3 className="mt-3 font-serif text-3xl">{item.title}</h3>
          <p className="mt-4 text-sm leading-7 text-white/85">&ldquo;{item.quote}&rdquo;</p>
        </div>
      </HoverCard>
    </Reveal>
  );
}

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Reveal key={item.question} delay={index * 0.06}>
          <details className="sf-surface rounded-[1.75rem] border border-[var(--sf-line)]/70 p-6 shadow-[0_18px_45px_rgba(61,41,35,0.08)]">
            <summary className="cursor-pointer list-none text-lg font-semibold text-[var(--sf-cocoa)]">{item.question}</summary>
            <p className="mt-3 text-sm leading-7 text-[var(--sf-cocoa-soft)]">{item.answer}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

export function StickyMobileCta({ primary, secondary }: { primary: PublicCta; secondary: PublicCta }) {
  return (
    <div className="sf-mobile-cta fixed inset-x-0 bottom-0 z-40 border-t border-[var(--sf-line)]/80 bg-[rgba(251,246,238,0.95)] p-3 shadow-[0_-10px_30px_rgba(61,41,35,0.08)] backdrop-blur sm:hidden">
      <div className="grid grid-cols-2 gap-3">
        <Link href={secondary.href} className="rounded-full bg-[var(--sf-green)] px-4 py-3 text-center text-sm font-semibold text-white">
          {secondary.label}
        </Link>
        <Link href={primary.href} className="rounded-full bg-[var(--sf-orange)] px-4 py-3 text-center text-sm font-semibold text-white">
          {primary.label}
        </Link>
      </div>
    </div>
  );
}

export function HeroImageCard() {
  return (
    <Reveal preset="heroMedia" className="relative">
      <div className="sf-surface hero-shape overflow-hidden rounded-[2.8rem] border border-[var(--sf-line)]/70 p-4 shadow-[0_14px_30px_rgba(61,41,35,0.1)]">
        <div className="relative overflow-hidden rounded-[2.2rem] bg-[var(--sf-paper)]">
          <Image
            src="/images/edukids-hero.webp"
            alt="Children learning and growing together"
            width={900}
            height={1100}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </div>
    </Reveal>
  );
}

export function CtaRow({ primary, secondary }: { primary: PublicCta; secondary: PublicCta }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Link href={secondary.href} className="rounded-[1.75rem] bg-white px-5 py-5 text-center text-sm font-semibold text-[var(--sf-cocoa)] shadow-[0_18px_45px_rgba(61,41,35,0.08)] transition hover:-translate-y-1">
        {secondary.label}
      </Link>
      <Link href={primary.href} className="rounded-[1.75rem] bg-[var(--sf-orange)] px-5 py-5 text-center text-sm font-semibold text-white transition hover:-translate-y-1">
        {primary.label}
      </Link>
    </div>
  );
}

export function ContactActionRow({ links }: { links: { label: string; value: string; accent: string }[] }) {
  return (
    <div className="space-y-4">
      {links.map((link, index) => (
        <Reveal key={link.label} delay={index * 0.06}>
          <div className="sf-surface flex items-center justify-between rounded-[1.75rem] border border-[var(--sf-line)]/70 px-5 py-5 shadow-[0_18px_45px_rgba(61,41,35,0.08)]">
            <span>
              <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sf-cocoa-soft)]">{link.label}</span>
              <span className="mt-1 block text-xl font-bold text-[var(--sf-cocoa)]">{link.value}</span>
            </span>
            <span className="text-sm font-semibold" style={{ color: link.accent }}>
              OPEN
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function BadgeRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <span key={item} className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--sf-cocoa)]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-[0_10px_20px_rgba(61,41,35,0.08)]">
            <Check size={12} />
          </span>
          {item}
        </span>
      ))}
    </div>
  );
}

export function InlineArrowLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 rounded-full border border-[var(--sf-cocoa)]/15 bg-white px-5 py-3 text-sm font-semibold text-[var(--sf-cocoa)] shadow-[0_18px_45px_rgba(61,41,35,0.08)] transition hover:-translate-y-1">
      {label}
      <ChevronRight size={16} />
    </Link>
  );
}

function colorClassName(color: FeatureCard["color"] | TestimonialItem["color"]) {
  if (color === "orange") return "bg-[var(--sf-orange)] text-white";
  if (color === "green") return "bg-[var(--sf-green)] text-white";
  if (color === "blue") return "bg-[var(--sf-blue)] text-white";
  if (color === "yellow") return "bg-[var(--sf-yellow)] text-[var(--sf-cocoa)]";
  if (color === "paper") return "bg-[var(--sf-paper)] text-[var(--sf-cocoa)]";
  if (color === "cocoa") return "bg-[var(--sf-cocoa)] text-white";
  return "bg-white text-[var(--sf-cocoa)]";
}
