"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Sparkles, ShieldCheck, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

const TEST_ACCOUNTS = [
  {
    label: "Super Admin",
    email: "superadmin@school.edu",
    password: "Admin@123",
    color: "from-red-500 to-rose-600",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    dot: "bg-red-500",
  },
  {
    label: "Admin",
    email: "admin@school.edu",
    password: "Admin@123",
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    dot: "bg-blue-500",
  },
  {
    label: "Accountant",
    email: "accounts@school.edu",
    password: "Admin@123",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    dot: "bg-emerald-500",
  },
  {
    label: "Teacher",
    email: "teacher1@school.edu",
    password: "Admin@123",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    dot: "bg-amber-500",
  },
  {
    label: "Parent",
    email: "parent1@school.edu",
    password: "Admin@123",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    dot: "bg-violet-500",
  },
];

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const showQuickLogin = process.env.NODE_ENV !== "production";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quickLoading, setQuickLoading] = useState<string | null>(null);
  const [error, setError] = useState(
    errorParam === "unauthorized"
      ? "Your account is signed in, but the admin portal is not available for this role yet."
      : errorParam === "CredentialsSignin"
      ? "Invalid email or password. Please try again."
      : ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  const handleQuickLogin = async (acc: (typeof TEST_ACCOUNTS)[0]) => {
    setQuickLoading(acc.label);
    setError("");

    const result = await signIn("credentials", {
      email: acc.email,
      password: acc.password,
      redirect: false,
    });

    if (result?.error) {
      setError(`Could not log in as ${acc.label}. Run "npm run seed" first.`);
      setQuickLoading(null);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(13,74,140,0.12),transparent_50%),linear-gradient(180deg,rgba(244,247,251,0.99),rgba(235,241,249,0.98))] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_50%),linear-gradient(180deg,rgba(9,14,24,0.99),rgba(8,12,20,0.98))]">

      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-[46%] xl:w-[42%] flex-col justify-between border-r border-border/60 bg-[linear-gradient(155deg,rgba(255,255,255,0.96),rgba(246,249,253,0.94))] p-12 dark:bg-[linear-gradient(155deg,rgba(9,14,24,0.98),rgba(11,17,29,0.97))]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
              <Sparkles size={22} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary/70">School OS</p>
              <p className="text-lg font-black tracking-tight text-foreground">Admin Command</p>
            </div>
          </div>

          <div className="mt-16 space-y-6">
            <h1 className="text-4xl font-black leading-[1.15] tracking-tight text-foreground">
              The operating system <br />
              <span className="text-primary">for your school.</span>
            </h1>
            <p className="max-w-sm text-base leading-7 text-muted-foreground">
              Manage students, staff, academics, fees, timetables, library, transport, and more — all in one unified platform.
            </p>
          </div>

          <div className="mt-12 grid gap-3">
            {[
              "Student & staff lifecycle management",
              "Automated fee collection & receipts",
              "Timetable, exams & attendance",
              "Library, inventory & transport",
              "Role-based portals for all stakeholders",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck size={13} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground/60">
          © 2026 School Management System · Admin Panel v2.0
        </p>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
              <Sparkles size={18} className="text-white" />
            </div>
            <p className="text-lg font-black tracking-tight text-foreground">School OS · Admin</p>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-foreground">Sign in</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access the admin panel.
          </p>

          {/* Error Banner */}
          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" />
              <p className="text-sm font-medium text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@school.edu"
                className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In to Admin Panel"
              )}
            </button>
          </form>

          {/* Test Quick Login — Dev Only */}
          {showQuickLogin ? <div className="mt-10">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-700 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                Dev · Quick Login
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Click any role to instantly log in. Requires <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">npm run seed</code> to be run first.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {TEST_ACCOUNTS.map((acc) => (
                <button
                  key={acc.label}
                  type="button"
                  onClick={() => handleQuickLogin(acc)}
                  disabled={!!quickLoading || loading}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all hover:shadow-sm disabled:opacity-50 ${acc.bg} ${acc.border}`}
                >
                  {quickLoading === acc.label ? (
                    <Loader2 size={14} className="shrink-0 animate-spin text-muted-foreground" />
                  ) : (
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${acc.dot}`} />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground">{acc.label}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{acc.email}</p>
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-4 text-center text-[11px] text-muted-foreground/60">
              All test accounts use password: <code className="font-mono">Admin@123</code>
            </p>
          </div> : null}
        </div>
      </div>
    </div>
  );
}
