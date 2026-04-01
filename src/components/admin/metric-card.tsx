import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Tone = "primary" | "emerald" | "amber" | "violet" | "sky" | "rose";

const toneClasses: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary",
  emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  violet: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
  sky: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
  rose: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300",
};

export function AdminMetricCard({
  label,
  value,
  description,
  icon,
  tone = "primary",
  className,
}: {
  label: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-foreground">{value}</p>
            {description ? (
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {icon ? (
            <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm", toneClasses[tone])}>
              {icon}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
