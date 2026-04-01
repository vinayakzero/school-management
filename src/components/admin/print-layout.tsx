import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function PrintPageLayout({
  backHref,
  backLabel,
  eyebrow,
  title,
  subtitle,
  note = "Open your browser print dialog to print this page.",
  children,
}: {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>
        <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Printer size={15} />
          {note}
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-border/70 bg-[linear-gradient(135deg,_rgba(10,39,74,0.96),_rgba(18,83,141,0.96)_55%,_rgba(30,112,167,0.94))] px-8 py-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight">{title}</h1>
          {subtitle ? <p className="mt-2 text-sm text-white/80">{subtitle}</p> : null}
        </div>
        <CardContent className="p-0">{children}</CardContent>
      </Card>
    </div>
  );
}
