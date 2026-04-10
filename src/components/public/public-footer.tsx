import Link from "next/link";
import { publicNavItems, schoolProfile, admissionCta, inquiryCta } from "@/lib/public-site-v2";

export default function PublicFooter() {
  return (
    <footer className="mt-20 bg-[var(--sf-cocoa)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60">{schoolProfile.location}</p>
              <h2 className="mt-2 font-serif text-4xl">{schoolProfile.name}</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/75">{schoolProfile.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={admissionCta.href} className="rounded-full bg-[var(--sf-orange)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1">
                {admissionCta.label}
              </Link>
              <Link href={inquiryCta.href} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--sf-cocoa)] transition hover:-translate-y-1">
                {inquiryCta.label}
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/55">Navigation</p>
              <div className="mt-4 space-y-3">
                {publicNavItems.map((item) => (
                  <Link key={item.href} href={item.href} className="block text-sm text-white/75 transition-colors hover:text-white">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/55">Admissions</p>
              <p className="mt-4 text-sm leading-7 text-white/75">{schoolProfile.admissionsNote}</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/55">Visit & Contact</p>
            <div className="mt-5 space-y-5 text-sm leading-7 text-white/75">
              <div>
                <p className="font-semibold text-white">Campus Address</p>
                <p>{schoolProfile.address}</p>
              </div>
              <div>
                <p className="font-semibold text-white">Admissions Desk</p>
                <p>{schoolProfile.phone}</p>
                <p>{schoolProfile.email}</p>
              </div>
              <div>
                <p className="font-semibold text-white">Visit Hours</p>
                <p>{schoolProfile.visitHours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.22em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>Public school frontend</p>
          <p>Frontend theme aligned with inquiry and admission workflows</p>
        </div>
      </div>
    </footer>
  );
}
