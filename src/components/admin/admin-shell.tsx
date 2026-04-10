"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ChevronRight, Sparkles, LogOut, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ADMIN_NAV_ITEMS, getActiveAdminItem, getAdminBreadcrumbs } from "./route-meta";

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  super_admin: { label: "Super Admin", color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  admin: { label: "Admin", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
  accountant: { label: "Accountant", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
  teacher: { label: "Teacher", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  parent: { label: "Parent", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400" },
};

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const activeItem = getActiveAdminItem(pathname);
  const breadcrumbs = getAdminBreadcrumbs(pathname);
  const currentLabel = breadcrumbs[breadcrumbs.length - 1]?.label || activeItem.label;
  const genericLabels = new Set(["New", "Edit", "Details", "Preview", "History", "Reports", "Register", "Payments", "Receipts", "Operations", "Results", "Documents", "Timetable"]);
  const headerTitle =
    currentLabel === activeItem.label ? activeItem.label : genericLabels.has(currentLabel) ? `${activeItem.label} ${currentLabel}` : currentLabel;

  const userRole = (session?.user as any)?.role || "admin";
  const userName = session?.user?.name || "Admin";
  const roleInfo = ROLE_LABELS[userRole] || ROLE_LABELS.admin;
  const initials = userName.split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(13,74,140,0.08),_transparent_38%),linear-gradient(180deg,_rgba(244,247,251,0.98),_rgba(238,243,248,0.96))] text-foreground dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_30%),linear-gradient(180deg,_rgba(9,14,24,0.98),_rgba(8,12,20,0.98))]">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-border/70 bg-[linear-gradient(180deg,_rgba(255,255,255,0.94),_rgba(246,249,252,0.92))] px-5 py-6 backdrop-blur xl:flex xl:flex-col dark:bg-[linear-gradient(180deg,_rgba(9,14,24,0.98),_rgba(11,17,29,0.98))]">

          {/* Brand */}
          <Link href="/admin" className="rounded-[28px] border border-border/80 bg-background/95 px-5 py-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/15">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">School OS</p>
                <h1 className="mt-1 text-lg font-black tracking-tight text-foreground">Admin Command</h1>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Institutional-grade workflows for academics, finance, and daily school operations.
            </p>
          </Link>

          {/* Nav */}
          <nav className="mt-6 flex-1 space-y-1.5 overflow-y-auto pr-1">
            {ADMIN_NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/admin" ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-start gap-3 rounded-2xl px-4 py-3 transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition-colors",
                      isActive
                        ? "border-primary/20 bg-primary text-primary-foreground"
                        : "border-border/80 bg-background text-muted-foreground group-hover:border-primary/15"
                    )}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.description}</span>
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User Panel */}
          <div className="mt-6">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex w-full items-center gap-3 rounded-2xl border border-border/80 bg-background/90 p-4 transition-colors hover:bg-accent/60"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground">
                  {initials}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate text-sm font-semibold text-foreground">{userName}</p>
                  <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold", roleInfo.color)}>
                    {roleInfo.label}
                  </span>
                </div>
                <ChevronDown size={14} className={cn("shrink-0 text-muted-foreground transition-transform", userMenuOpen && "rotate-180")} />
              </button>

              {userMenuOpen && (
                <div className="absolute bottom-full mb-2 w-full rounded-2xl border border-border/80 bg-background shadow-lg">
                  <div className="p-2">
                    <Link
                      href="/admin/users"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      Manage Users
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-xl">
            <div className="px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {breadcrumbs.map((crumb, index) => (
                        <span key={crumb.href} className="inline-flex items-center gap-2">
                          {index > 0 && <ChevronRight size={12} className="text-border" />}
                          <span className={index === breadcrumbs.length - 1 ? "text-foreground" : ""}>{crumb.label}</span>
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-black tracking-tight text-foreground">{headerTitle}</h2>
                      <Badge variant="outline" className="rounded-full border-primary/15 bg-primary/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary">
                        {activeItem.label}
                      </Badge>
                    </div>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{activeItem.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Mobile user + logout */}
                    <div className="flex items-center gap-2 xl:hidden">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-xs font-bold text-primary-foreground">
                        {initials}
                      </div>
                      <span className={cn("hidden rounded-full px-2 py-0.5 text-[11px] font-semibold sm:inline-flex", roleInfo.color)}>
                        {roleInfo.label}
                      </span>
                    </div>
                    <Link href="/admin/settings" className={buttonVariants({ variant: "outline", size: "sm" })}>
                      Settings
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5 text-muted-foreground xl:hidden")}
                    >
                      <LogOut size={14} />
                      <span className="hidden sm:inline">Sign Out</span>
                    </button>
                  </div>
                </div>

                {/* Mobile nav */}
                <nav className="flex gap-2 overflow-x-auto pb-1 xl:hidden">
                  {ADMIN_NAV_ITEMS.map((item) => {
                    const isActive =
                      item.href === "/admin" ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "whitespace-nowrap rounded-full border px-3 py-2 text-sm font-semibold transition-colors",
                          isActive
                            ? "border-primary/20 bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
