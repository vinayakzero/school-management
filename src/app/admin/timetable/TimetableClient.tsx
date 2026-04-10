"use client";

import { useState } from "react";
import Link from "next/link";
import { Grid3x3, Search, Edit2, Trash2, CalendarDays } from "lucide-react";
import { deleteTimetableEntryAction } from "./actions";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminSectionCard } from "@/components/admin/section-card";
import { AdminEmptyState } from "@/components/admin/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TimetableClient({ classes }: { classes: any[] }) {
  const [gradeFilter, setGradeFilter] = useState("All");

  const uniqueGrades = Array.from(new Set(classes.map((c) => c.grade))).sort();
  const filteredClasses = classes.filter((c) => gradeFilter === "All" || c.grade === gradeFilter);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Academic Logistics"
        title="Timetable Manager"
        description="Organize class schedules, assign teachers to periods, and detect scheduling conflicts."
      >
        <Link href="/admin/timetable/new" className={buttonVariants({ variant: "default" })}>
          <CalendarDays size={18} className="mr-2" />
          Add Schedule Entry
        </Link>
      </AdminPageHeader>

      <AdminSectionCard
        title="Class Timetables"
        description="Select a class to view its full weekly schedule or modify existing periods."
      >
        <div className="border-b border-border/70 bg-muted/50 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={gradeFilter === "All" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setGradeFilter("All")}
            >
              All Grades
            </Badge>
            {uniqueGrades.map((g) => (
              <Badge
                key={g}
                variant={gradeFilter === g ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setGradeFilter(g)}
              >
                {g}
              </Badge>
            ))}
          </div>
        </div>

        {filteredClasses.length === 0 ? (
          <div className="p-6">
            <AdminEmptyState
              icon={Grid3x3}
              title="No classes found"
              description="Register classes first to build a timetable."
              actionHref="/admin/classes"
              actionLabel="Manage Classes"
            />
          </div>
        ) : (
          <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredClasses.map((cls) => (
              <Link
                key={cls._id}
                href={`/admin/timetable/class/${cls._id}`}
                className="group relative flex flex-col rounded-2xl border border-border bg-background p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Grid3x3 size={20} />
                  </div>
                  <Badge variant="outline" className="border-primary/15 bg-primary/5 text-primary">
                    {cls.periodCount || 0} periods
                  </Badge>
                </div>
                <h3 className="mt-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {cls.grade} - Section {cls.section}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">Class Teacher: {cls.classTeacher?.name || "Not assigned"}</p>
              </Link>
            ))}
          </div>
        )}
      </AdminSectionCard>
    </div>
  );
}
