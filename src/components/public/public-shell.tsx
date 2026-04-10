import type { ReactNode } from "react";
import PublicFooter from "./public-footer";
import PublicHeader from "./public-header";
import PublicPageTransition from "./page-transition";

export default function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="public-theme site-shell relative min-h-screen overflow-x-clip text-[var(--sf-cocoa)]">
      <div className="top-band" />
      <PublicHeader />
      <main className="relative pb-20 sm:pb-0">
        <PublicPageTransition>{children}</PublicPageTransition>
      </main>
      <PublicFooter />
    </div>
  );
}
