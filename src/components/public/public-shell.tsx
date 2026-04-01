import type { ReactNode } from "react";
import PublicFooter from "./public-footer";
import PublicHeader from "./public-header";
import PublicPageTransition from "./page-transition";

export default function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="public-theme relative min-h-screen overflow-x-clip">
      <PublicHeader />
      <main className="relative">
        <PublicPageTransition>{children}</PublicPageTransition>
      </main>
      <PublicFooter />
    </div>
  );
}
