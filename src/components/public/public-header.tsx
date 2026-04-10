"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { admissionCta, inquiryCta, publicNavItems, schoolProfile } from "@/lib/public-site-v2";
import { cn } from "@/lib/utils";

export default function PublicHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isPublicActionPath = pathname === inquiryCta.href || pathname === admissionCta.href;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--sf-line)]/70 bg-[rgba(251,246,238,0.9)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-serif text-3xl font-semibold tracking-tight text-[var(--sf-cocoa)]">
          {schoolProfile.shortName}
          <span className="text-[var(--sf-orange)]">.</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
          {publicNavItems.map((item) => {
            const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("transition hover:text-[var(--sf-orange)]", isActive && "text-[var(--sf-orange)]")}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href={inquiryCta.href}
            className={cn(
              "rounded-full border border-[var(--sf-cocoa)]/15 px-5 py-2.5 text-sm font-semibold text-[var(--sf-cocoa)] transition hover:-translate-y-1",
              pathname === inquiryCta.href && "bg-white shadow-[0_18px_45px_rgba(61,41,35,0.08)]"
            )}
          >
            {inquiryCta.label}
          </Link>
          <Link
            href={admissionCta.href}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold shadow-[0_18px_45px_rgba(61,41,35,0.08)] transition hover:-translate-y-1",
              isPublicActionPath
                ? "bg-[var(--sf-orange)] text-white"
                : "bg-white text-[var(--sf-cocoa)]"
            )}
          >
            {admissionCta.label}
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--sf-cocoa)]/15 bg-white text-[var(--sf-cocoa)] lg:hidden"
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-[var(--sf-line)]/70 px-4 py-4 lg:hidden">
          <div className="mx-auto max-w-7xl space-y-2">
            {publicNavItems.map((item) => {
              const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-sm font-semibold",
                    isActive ? "bg-[var(--sf-orange)] text-white" : "bg-white text-[var(--sf-cocoa)]"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link href={inquiryCta.href} onClick={() => setIsMenuOpen(false)} className="rounded-full bg-[var(--sf-green)] px-4 py-3 text-center text-sm font-semibold text-white">
                {inquiryCta.label}
              </Link>
              <Link href={admissionCta.href} onClick={() => setIsMenuOpen(false)} className="rounded-full bg-[var(--sf-orange)] px-4 py-3 text-center text-sm font-semibold text-white">
                {admissionCta.label}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
