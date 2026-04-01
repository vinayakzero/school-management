import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { admissionsCta, campusVisitCta, publicNavItems, schoolProfile } from "@/lib/public-site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function PublicFooter() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(217,183,120,0.18),_transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/6 font-serif text-xl tracking-[0.12em] text-amber-200">
                MH
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">{schoolProfile.location}</p>
                <h2 className="font-serif text-3xl text-white">{schoolProfile.name}</h2>
              </div>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-300">{schoolProfile.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={admissionsCta.href}
                className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-amber-300 text-slate-950 hover:bg-amber-200")}
              >
                {admissionsCta.label}
                <ArrowRight size={16} />
              </Link>
              <Link
                href={campusVisitCta.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                )}
              >
                {campusVisitCta.label}
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Navigation</p>
              <div className="mt-4 space-y-3">
                {publicNavItems.map((item) => (
                  <Link key={item.href} href={item.href} className="block text-sm text-slate-300 transition-colors hover:text-white">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Admissions</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{schoolProfile.admissionsNote}</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Visit & Contact</p>
            <div className="mt-5 space-y-5 text-sm leading-7 text-slate-300">
              <div className="flex gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-amber-200" />
                <div>
                  <p className="font-semibold text-white">Campus Address</p>
                  <p>{schoolProfile.address}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone size={18} className="mt-1 shrink-0 text-amber-200" />
                <div>
                  <p className="font-semibold text-white">Admissions Desk</p>
                  <p>{schoolProfile.phone}</p>
                  <p>{schoolProfile.email}</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-white">Visit Hours</p>
                <p>{schoolProfile.visitHours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.22em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Institutional public frontend preview</p>
          <p>Prepared for frontend-first storytelling before backend workflows</p>
        </div>
      </div>
    </footer>
  );
}
