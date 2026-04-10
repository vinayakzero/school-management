import type { Metadata } from "next";
import type { ReactNode } from "react";
import PublicShell from "@/components/public/public-shell";
import { schoolProfile } from "@/lib/public-site-v2";

export const metadata: Metadata = {
  title: {
    default: schoolProfile.name,
    template: `%s | ${schoolProfile.name}`,
  },
  description: schoolProfile.tagline,
};

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <PublicShell>{children}</PublicShell>;
}
