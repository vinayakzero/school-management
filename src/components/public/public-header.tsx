"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { admissionsCta, publicNavItems, schoolProfile } from "@/lib/public-site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function PublicHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const solidHeader = isScrolled || isMenuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "mx-auto max-w-7xl rounded-full border px-4 py-3 transition-all duration-500 sm:px-5",
          solidHeader
            ? "border-slate-200/70 bg-[#f7f2e8]/92 text-slate-900 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/78 dark:text-slate-100"
            : "border-white/12 bg-transparent text-white"
        )}
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-bold uppercase tracking-[0.3em]",
                solidHeader
                  ? "border-amber-500/25 bg-slate-950 text-amber-300 dark:bg-white dark:text-slate-950"
                  : "border-white/25 bg-white/10 text-white"
              )}
            >
              MH
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.34em] text-current/70">
                {schoolProfile.location}
              </span>
              <span className="block truncate font-serif text-lg tracking-[0.02em]">{schoolProfile.shortName}</span>
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {publicNavItems.map((item) => {
              const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? solidHeader
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                        : "bg-white/14 text-white"
                      : solidHeader
                        ? "text-slate-700 hover:bg-slate-900/6 dark:text-slate-200 dark:hover:bg-white/8"
                        : "text-white/82 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <Link
              href={admissionsCta.href}
              className={cn(
                buttonVariants({ size: "sm" }),
                solidHeader
                  ? "rounded-full border border-amber-500/20 bg-slate-950 px-5 text-amber-200 hover:bg-slate-900 dark:bg-amber-300 dark:text-slate-950 dark:hover:bg-amber-200"
                  : "rounded-full border border-white/16 bg-white/12 px-5 text-white hover:bg-white/18"
              )}
            >
              {admissionsCta.label}
              <ArrowRight size={16} />
            </Link>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMenuOpen((current) => !current)}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden",
              solidHeader
                ? "border-slate-200 bg-white text-slate-900 dark:border-white/12 dark:bg-slate-900 dark:text-white"
                : "border-white/18 bg-white/10 text-white"
            )}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <div className="rounded-[28px] border border-slate-200/80 bg-white/96 p-4 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-slate-950/92">
                <div className="space-y-2">
                  {publicNavItems.map((item) => {
                    const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block rounded-2xl px-4 py-3",
                          isActive
                            ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                            : "bg-slate-100/80 text-slate-800 dark:bg-white/5 dark:text-slate-100"
                        )}
                      >
                        <div className="text-sm font-semibold">{item.title}</div>
                        <p className="mt-1 text-xs leading-5 text-current/70">{item.description}</p>
                      </Link>
                    );
                  })}
                </div>

                <Link
                  href={admissionsCta.href}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-4 flex w-full rounded-full bg-amber-400 text-slate-950 hover:bg-amber-300"
                  )}
                >
                  {admissionsCta.label}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
