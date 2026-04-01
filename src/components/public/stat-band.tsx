"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "./motion";

interface StatBandItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
}

interface StatBandProps {
  items: StatBandItem[];
}

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.3,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export default function StatBand({ items }: StatBandProps) {
  return (
    <section className="rounded-[32px] border border-slate-200/70 bg-slate-950 px-6 py-8 text-white shadow-[0_34px_90px_-58px_rgba(15,23,42,0.6)] dark:border-white/10">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.08}>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="font-serif text-4xl text-amber-200">
                <AnimatedNumber value={item.value} prefix={item.prefix} suffix={item.suffix} />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.label}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
