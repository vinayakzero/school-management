"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserAction, updateUserAction } from "./actions";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";

const ROLES = [
  { value: "super_admin", label: "Super Admin" },
  { value: "admin", label: "Admin" },
  { value: "accountant", label: "Accountant" },
  { value: "teacher", label: "Teacher" },
  { value: "parent", label: "Parent" },
];

interface UserFormProps {
  mode: "create" | "edit";
  user?: {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };
}

export default function UserForm({ mode, user }: UserFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const res = mode === "create"
      ? await createUserAction(formData)
      : await updateUserAction(user!._id, formData);

    if (res.success) {
      router.push("/admin/users");
      router.refresh();
    } else {
      setError(res.error || "Something went wrong.");
      setSaving(false);
    }
  };

  const fieldClass = "mt-2 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all";
  const labelClass = "block text-sm font-semibold text-foreground";

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="User Management"
        title={mode === "create" ? "Add User Account" : "Edit User Account"}
        description={
          mode === "create"
            ? "Create a login account and assign a role to grant system access."
            : "Update this user's details, role, or password."
        }
      />

      <form onSubmit={handleSubmit}>
        <AdminSectionCard title="Account Details" description="Basic identity and login information.">
          <div className="grid gap-5 p-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>Full Name</label>
              <input id="name" name="name" required placeholder="e.g. Priya Sharma" defaultValue={user?.name} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email Address</label>
              <input id="email" name="email" type="email" required placeholder="e.g. priya@school.edu" defaultValue={user?.email} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="role" className={labelClass}>Role</label>
              <select id="role" name="role" required defaultValue={user?.role || "admin"} className={fieldClass}>
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
            {mode === "edit" && (
              <div>
                <label htmlFor="status" className={labelClass}>Status</label>
                <select id="status" name="status" defaultValue={user?.status || "Active"} className={fieldClass}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            )}
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title={mode === "create" ? "Set Password" : "Reset Password"}
          description={
            mode === "create"
              ? "Set a secure password (minimum 6 characters)."
              : "Leave blank to keep the current password. Enter a new value to reset it."
          }
        >
          <div className="grid gap-5 p-6 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className={labelClass}>
                {mode === "create" ? "Password" : "New Password"}
                {mode === "edit" && <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span>}
              </label>
              <input
                id="password"
                name={mode === "create" ? "password" : "newPassword"}
                type="password"
                placeholder="Minimum 6 characters"
                required={mode === "create"}
                minLength={mode === "create" ? 6 : undefined}
                className={fieldClass}
              />
            </div>
          </div>
        </AdminSectionCard>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-60 transition-all"
          >
            {saving ? "Saving…" : mode === "create" ? "Create User" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-2xl border border-border px-6 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-accent transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
