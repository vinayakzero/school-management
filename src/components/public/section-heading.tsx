import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500 dark:text-slate-400">{eyebrow}</p> : null}
      <h2 className="mt-4 font-serif text-3xl leading-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{description}</p> : null}
    </div>
  );
}
