"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { MotionPresetKey } from "@/lib/public-site";
import { cn } from "@/lib/utils";

const transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const motionPresets: Record<MotionPresetKey, Variants> = {
  heroCaption: {
    hidden: { opacity: 0, x: -40, y: 28 },
    visible: { opacity: 1, x: 0, y: 0 },
  },
  heroMedia: {
    hidden: { opacity: 0, scale: 1.08 },
    visible: { opacity: 1, scale: 1 },
  },
  sectionReveal: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  stagger: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  cardHover: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  },
  marquee: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  pageTransition: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  },
};

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  preset?: Exclude<MotionPresetKey, "marquee" | "pageTransition">;
  delay?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  preset = "sectionReveal",
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={motionPresets[preset]}
      transition={{ ...transition, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

export function HoverCard({ children, className }: HoverCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
