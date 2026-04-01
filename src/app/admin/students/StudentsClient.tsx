"use client";

import Link from "next/link";
import { useState } from "react";
import { UserPlus, Search, Edit2, Trash2, Users } from "lucide-react";
import { deleteStudentAction } from "./actions";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { AdminEmptyState } from "@/components/admin/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function StudentsClient({ students: initialStudents }: { students: any[] }) {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.grade.toLowerCase().includes(search.toLowerCase()) ||
    (s.admissionNumber || "").toLowerCase().includes(search.toLowerCase()) ||
    (s.rollNumber || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? This cannot be undone.`)) return;
    setDeletingId(id);
    await deleteStudentAction(id);
    setStudents(prev => prev.filter(s => s._id !== id));
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Core Admin Surface"
        title="Student Registry"
        description={`Manage enrollment records, identity details, and linked student workflows. ${students.length} total record${students.length === 1 ? "" : "s"} available.`}
      >
        <Link href="/admin/students/new" className={buttonVariants({ variant: "default" })}>
          <UserPlus size={18} />
          Add Student
        </Link>
      </AdminPageHeader>

      <AdminSectionCard
        title="Student List"
        description="Search by identity, grade, or record details and jump directly into student workflows."
      >
        <div className="flex flex-col items-center justify-between gap-4 border-b border-border/70 bg-muted/50 p-4 sm:flex-row">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, email, grade, admission number, or roll number"
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
              title="No students matched this search"
              description="Try a different search term or add a new student record to begin the admission workflow."
              actionHref="/admin/students/new"
              actionLabel="Add Student"
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Student Info</TableHead>
                <TableHead>Identity</TableHead>
                <TableHead>Grade / Section</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((student) => (
                <TableRow key={student._id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-sm font-bold text-primary">
                        {student.name.split(" ").slice(0, 2).map((n: string) => n[0]).join("")}
                      </div>
                      <div>
                        <Link href={`/admin/students/${student._id}`} className="font-semibold text-foreground transition-colors hover:text-primary">
                          {student.name}
                        </Link>
                        <div className="text-xs text-muted-foreground">{student.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{student.admissionNumber || "-"}</div>
                    <div className="text-xs text-muted-foreground">Roll {student.rollNumber || "-"}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{student.grade}</div>
                    <div className="text-xs text-muted-foreground">Section {student.section}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {student.dateOfBirth
                      ? new Date(student.dateOfBirth).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Active" ? "success" : student.status === "Pending" ? "warning" : "muted"}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/students/${student._id}`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                        title="Open"
                      >
                        Open
                      </Link>
                      <Link
                        href={`/admin/students/${student._id}/edit`}
                        className={buttonVariants({ variant: "ghost", size: "icon" })}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(student._id, student.name)}
                        disabled={deletingId === student._id}
                        className={buttonVariants({ variant: "ghost", size: "icon" })}
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </AdminSectionCard>
    </div>
  );
}
