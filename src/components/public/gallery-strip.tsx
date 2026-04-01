"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./motion";

interface GalleryImage {
  title: string;
  src: string;
  alt: string;
}

interface GalleryStripProps {
  eyebrow?: string;
  title: string;
  description?: string;
  images: GalleryImage[];
}

export default function GalleryStrip({ eyebrow, title, description, images }: GalleryStripProps) {
  const shouldReduceMotion = useReducedMotion();
  const marqueeImages = [...images, ...images];

  return (
    <section>
      <Reveal className="max-w-3xl">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500 dark:text-slate-400">{eyebrow}</p> : null}
        <h2 className="mt-4 font-serif text-3xl leading-tight text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
        {description ? <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{description}</p> : null}
      </Reveal>

      <div className="mt-8 overflow-hidden rounded-[34px] border border-slate-200/80 bg-white/70 p-4 shadow-[0_26px_80px_-56px_rgba(15,23,42,0.4)] dark:border-white/10 dark:bg-slate-950/40">
        {shouldReduceMotion ? (
          <div className="grid gap-4 md:grid-cols-3">
            {images.map((image) => (
              <div key={image.title} className="relative h-64 overflow-hidden rounded-[24px]">
                <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {marqueeImages.map((image, index) => (
              <div key={`${image.title}-${index}`} className="relative h-64 w-[320px] shrink-0 overflow-hidden rounded-[24px]">
                <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="320px" />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
