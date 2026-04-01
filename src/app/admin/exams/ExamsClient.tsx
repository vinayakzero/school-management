"use client";

import { useState } from "react";
import { Plus, Search, Trash2, CalendarHeart, ClipboardEdit, Printer, Pencil, NotebookPen } from "lucide-react";
import { deleteExamAction } from "./actions";
import Link from "next/link";
import { formatShortDate } from "@/lib/date";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { AdminEmptyState } from "@/components/admin/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ExamsClient({ exams }: { exams: any[]; subjects: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Warning: Deleting ${name} will permanently remove all student marks associated with it! Are you sure?`)) {
      await deleteExamAction(id);
    }
  };

  const filteredExams = exams.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.subject?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Core Admin Surface"
        title="Examination Control"
        description="Schedule subject-level exams, update them from dedicated routes, and move directly into marks entry or print workflows."
      >
        <Link href="/admin/exams/new" className={buttonVariants({ variant: "default" })}>
          <Plus size={18} />
          Schedule Exam
        </Link>
        <Link href="/admin/exams/timetable" className={buttonVariants({ variant: "outline" })}>
          <Printer size={18} />
          Print Timetable
        </Link>
      </AdminPageHeader>

      <AdminSectionCard title="Exam Register" description="Search by exam title, grade, or subject and open the next workflow in one click.">
        <div className="border-b border-border/70 bg-muted/50 p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Search exams by name, grade, or subject"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredExams.length === 0 ? (
          <div className="p-6">
            <AdminEmptyState
              icon={CalendarHeart}
              title="No exams matched the current search"
              description="Create the first exam schedule or widen the search to review the full exam register."
              actionHref="/admin/exams/new"
              actionLabel="Schedule Exam"
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Exam Level & Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Max Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExams.map((exam) => (
                <TableRow key={exam._id}>
                  <TableCell>
                    <div className="font-semibold text-foreground">{exam.name}</div>
                    <div className="text-xs text-muted-foreground">{exam.grade}</div>
                  </TableCell>
                  <TableCell>{exam.subject ? `${exam.subject.name} (${exam.subject.code})` : "N/A"}</TableCell>
                  <TableCell>
                    <span className="rounded-full border border-primary/15 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                      {formatShortDate(exam.date)}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-muted-foreground">{exam.totalMarks}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/exams/${exam._id}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })} title="Edit Exam">
                        <Pencil size={18} />
                      </Link>
                      <Link href={`/admin/exams/${exam._id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                        <ClipboardEdit size={14} />
                        Enter Marks
                      </Link>
                      <button
                        onClick={() => handleDelete(exam._id, exam.name)}
                        className={buttonVariants({ variant: "ghost", size: "icon" })}
                        title="Delete Exam"
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

      <AdminSectionCard title="Workflow Notes" description="Exam actions are now route-based for scheduling, editing, marks entry, and print preparation.">
        <div className="grid gap-4 p-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border/80 bg-background/80 p-4">
            <NotebookPen className="text-primary" size={18} />
            <p className="mt-3 text-sm font-semibold text-foreground">Dedicated Edit Route</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Every exam can now be opened from the list, edited on its own route, and saved back into the register cleanly.</p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-background/80 p-4">
            <ClipboardEdit className="text-primary" size={18} />
            <p className="mt-3 text-sm font-semibold text-foreground">Marks Entry Flow</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Schedule creation remains separate from evaluation, keeping academic office work and mark entry clearly separated.</p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-background/80 p-4">
            <Printer className="text-primary" size={18} />
            <p className="mt-3 text-sm font-semibold text-foreground">Print-ready Timetable</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Operators can move from the exam register to the timetable print route without leaving the exam control surface.</p>
          </div>
        </div>
      </AdminSectionCard>
    </div>
  );
}
