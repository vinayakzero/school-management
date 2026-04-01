import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AdminPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: AdminPageHeaderProps) {
  return (
    <Card className={cn("overflow-hidden border-primary/10 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(245,248,252,0.98))] dark:bg-[linear-gradient(135deg,_rgba(9,14,24,0.98),_rgba(13,20,34,0.98))]", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">{eyebrow}</p>
            ) : null}
            <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground">{title}</h1>
            {description ? (
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {children ? <div className="flex flex-wrap items-center gap-3">{children}</div> : null}
        </div>
      </CardContent>
    </Card>
  );
}
