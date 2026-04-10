"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Search, Edit2, Trash2, UserX, Users } from "lucide-react";
import { deleteUserAction, deactivateUserAction } from "./actions";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { AdminEmptyState } from "@/components/admin/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ROLE_META: Record<string, { label: string; variant: "success" | "warning" | "muted" | "outline" }> = {
  super_admin: { label: "Super Admin", variant: "outline" },
  admin: { label: "Admin", variant: "success" },
  accountant: { label: "Accountant", variant: "warning" },
  teacher: { label: "Teacher", variant: "muted" },
  parent: { label: "Parent", variant: "muted" },
};

export default function UsersClient({ users: initialUsers }: { users: any[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeactivate = async (id: string, name: string) => {
    if (!confirm(`Deactivate "${name}"? They will no longer be able to log in.`)) return;
    setLoadingId(id);
    const res = await deactivateUserAction(id);
    if (res.success) {
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, status: "Inactive" } : u)));
    }
    setLoadingId(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Permanently delete user "${name}"? This cannot be undone.`)) return;
    setLoadingId(id);
    await deleteUserAction(id);
    setUsers((prev) => prev.filter((u) => u._id !== id));
    setLoadingId(null);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="System Administration"
        title="User Accounts"
        description={`Manage login credentials, roles, and access permissions. ${users.length} account${users.length === 1 ? "" : "s"} registered.`}
      >
        <Link href="/admin/users/new" className={buttonVariants({ variant: "default" })}>
          <ShieldCheck size={18} />
          Add User
        </Link>
      </AdminPageHeader>

      <AdminSectionCard
        title="All Users"
        description="Search by name, email, or role. Click Edit to update credentials or reset passwords."
      >
        <div className="flex flex-col items-center justify-between gap-4 border-b border-border/70 bg-muted/50 p-4 sm:flex-row">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, email, or role…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-6">
            <AdminEmptyState
              icon={Users}
              title="No users found"
              description="Add the first user account to enable login access."
              actionHref="/admin/users/new"
              actionLabel="Add User"
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => {
                const roleMeta = ROLE_META[user.role] || { label: user.role, variant: "muted" as const };
                return (
                  <TableRow key={user._id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-sm font-bold text-primary">
                          {user.name.split(" ").slice(0, 2).map((n: string) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={roleMeta.variant}>{roleMeta.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Active" ? "success" : "muted"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                        : "Never"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/users/${user._id}/edit`}
                          className={buttonVariants({ variant: "ghost", size: "icon" })}
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </Link>
                        {user.status === "Active" && (
                          <button
                            onClick={() => handleDeactivate(user._id, user.name)}
                            disabled={loadingId === user._id}
                            className={buttonVariants({ variant: "ghost", size: "icon" })}
                            title="Deactivate"
                          >
                            <UserX size={16} className="text-amber-600 dark:text-amber-400" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(user._id, user.name)}
                          disabled={loadingId === user._id}
                          className={buttonVariants({ variant: "ghost", size: "icon" })}
                          title="Delete"
                        >
                          <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </AdminSectionCard>
    </div>
  );
}
