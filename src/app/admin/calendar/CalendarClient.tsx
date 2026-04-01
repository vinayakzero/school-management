"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Flag, LayoutList, Pencil, Plus, Trash2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteEventAction } from "./actions";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminMetricCard } from "@/components/admin/metric-card";
import { AdminSectionCard } from "@/components/admin/section-card";
import { AdminEmptyState } from "@/components/admin/empty-state";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function getTypeClasses(type: string, isHoliday: boolean) {
  if (isHoliday) return "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400";
  if (type === "Exam") return "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400";
  if (type === "Meeting") return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
  if (type === "Deadline") return "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400";
  return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
}

export default function CalendarClient({ events }: { events: any[] }) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [visibleMonth, setVisibleMonth] = useState(() => {
    if (events.length > 0) return new Date(events[0].startDate);
    return new Date();
  });

  const groupedEvents = useMemo(() => {
    const map = new Map<string, any[]>();
    events.forEach((event) => {
      const key = new Date(event.startDate).toLocaleDateString("en-US", { month: "long", year: "numeric" });
      const current = map.get(key) || [];
      current.push(event);
      map.set(key, current);
    });
    return Array.from(map.entries());
  }, [events]);

  const summary = useMemo(() => {
    const holidays = events.filter((event) => event.isHoliday).length;
    const meetings = events.filter((event) => event.type === "Meeting").length;
    const exams = events.filter((event) => event.type === "Exam").length;
    const parentMeetings = events.filter((event) => event.type === "Meeting" && event.audience === "Parents").length;
    return { total: events.length, holidays, meetings, exams, parentMeetings };
  }, [events]);

  const monthStart = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
  const monthEnd = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0);
  const startWeekday = monthStart.getDay();
  const daysInMonth = monthEnd.getDate();
  const monthTitle = monthStart.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const eventsByDate = useMemo(() => {
    const map = new Map<string, any[]>();
    events.forEach((event) => {
      const cursor = new Date(event.startDate);
      const end = new Date(event.endDate);
      while (cursor <= end) {
        const key = cursor.toISOString().split("T")[0];
        const current = map.get(key) || [];
        current.push(event);
        map.set(key, current);
        cursor.setDate(cursor.getDate() + 1);
      }
    });
    return map;
  }, [events]);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Delete "${title}" from the calendar?`)) {
      await deleteEventAction(id);
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Core Admin Surface"
        title="Calendar & Events"
        description="Plan holidays, meetings, exam windows, and school activities from route-based workflows that stay aligned with attendance operations."
      >
        <Link href="/admin/calendar/new" className={buttonVariants({ variant: "default" })}>
          <Plus size={16} />
          Add Event
        </Link>
      </AdminPageHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <AdminMetricCard icon={<CalendarDays className="h-5 w-5" />} label="Total Events" value={summary.total.toString()} />
        <AdminMetricCard icon={<Flag className="h-5 w-5" />} label="Holidays" value={summary.holidays.toString()} tone="rose" />
        <AdminMetricCard icon={<Users className="h-5 w-5" />} label="Meetings" value={summary.meetings.toString()} tone="violet" />
        <AdminMetricCard icon={<CalendarDays className="h-5 w-5" />} label="Exam Events" value={summary.exams.toString()} tone="amber" />
        <AdminMetricCard icon={<Users className="h-5 w-5" />} label="Parent Meetings" value={summary.parentMeetings.toString()} tone="sky" />
      </div>

      <AdminSectionCard title="Calendar Controls" description="Move between list and month views while preserving route-based add and edit actions.">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))}
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <ChevronLeft size={16} />
            </button>
            <Badge variant="outline" className="rounded-full px-3 py-2 text-sm font-semibold">
              {monthTitle}
            </Badge>
            <button
              onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))}
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode("list")} className={buttonVariants({ variant: viewMode === "list" ? "default" : "outline", size: "sm" })}>
              <LayoutList size={16} />
              List View
            </button>
            <button onClick={() => setViewMode("calendar")} className={buttonVariants({ variant: viewMode === "calendar" ? "default" : "outline", size: "sm" })}>
              <CalendarDays size={16} />
              Calendar View
            </button>
          </div>
        </div>
      </AdminSectionCard>

      {groupedEvents.length === 0 ? (
        <AdminEmptyState
          icon={CalendarDays}
          title="No calendar events yet"
          description="Add the first holiday, meeting, exam window, or school activity to start building the annual school calendar."
          actionHref="/admin/calendar/new"
          actionLabel="Add Event"
        />
      ) : viewMode === "calendar" ? (
        <AdminSectionCard title="Month View" description="Visual planning surface for attendance-impacting events and school-wide scheduling.">
          <div className="p-5">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-2">
              {Array.from({ length: startWeekday }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="min-h-[128px] rounded-2xl border border-dashed border-border bg-muted/30"
                />
              ))}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const dayNumber = index + 1;
                const dayDate = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), dayNumber);
                const dayKey = dayDate.toISOString().split("T")[0];
                const dayEvents = eventsByDate.get(dayKey) || [];

                return (
                  <div
                    key={dayKey}
                    className={cn(
                      "min-h-[128px] rounded-2xl border p-3",
                      dayEvents.length > 0
                        ? "border-primary/20 bg-primary/5"
                        : "border-border bg-background"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-bold text-foreground">{dayNumber}</span>
                      {dayEvents.some((event) => event.isHoliday) ? <Flag size={14} className="text-red-500" /> : null}
                    </div>
                    <div className="mt-3 space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div key={`${dayKey}-${event._id}`} className={`rounded-lg px-2 py-1 text-[11px] font-semibold ${getTypeClasses(event.type, event.isHoliday)}`}>
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 ? (
                        <p className="text-[11px] font-medium text-muted-foreground">+{dayEvents.length - 3} more</p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AdminSectionCard>
      ) : (
        groupedEvents.map(([monthLabel, monthEvents]) => (
          <AdminSectionCard key={monthLabel} title={monthLabel} description="Route-based event management for school planning and holiday coordination.">
            <div className="divide-y divide-border/70">
              {monthEvents.map((event) => (
                <div key={event._id} className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-foreground">{event.title}</p>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(event.type, event.isHoliday)}`}>
                        {event.isHoliday ? "Holiday" : event.type}
                      </span>
                      {event.grade ? (
                        <Badge variant="muted" className="rounded-full">
                          {event.grade}
                        </Badge>
                      ) : null}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {" "}
                      to
                      {" "}
                      {new Date(event.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {" · "}
                      {event.audience}
                    </p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {event.description || "No additional event notes."}
                    </p>
                    {event.type === "Meeting" ? (
                      <div className="rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm">
                        <p className="font-semibold text-primary">
                          {(event.meetingDetails?.hostTeacher as any)?.name || "Teacher to be assigned"}
                        </p>
                        <p className="mt-1 text-primary/80">
                          {event.meetingDetails?.meetingMode || "In Person"}
                          {event.meetingDetails?.slotLabel ? ` • ${event.meetingDetails.slotLabel}` : ""}
                        </p>
                        {event.meetingDetails?.venue ? (
                          <p className="mt-1 text-primary/75">Venue: {event.meetingDetails.venue}</p>
                        ) : null}
                        {event.meetingDetails?.parentInstructions ? (
                          <p className="mt-2 text-xs text-primary/75">{event.meetingDetails.parentInstructions}</p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/calendar/${event._id}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })} title="Edit event">
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(event._id, event.title)}
                      className={buttonVariants({ variant: "ghost", size: "icon" })}
                      title="Delete event"
                    >
                      <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </AdminSectionCard>
        ))
      )}
    </div>
  );
}
