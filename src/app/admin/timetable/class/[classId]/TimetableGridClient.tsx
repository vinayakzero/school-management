"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, Plus, Clock, MapPin, Search } from "lucide-react";
import { deleteTimetableEntryAction } from "../../actions";
import { buttonVariants } from "@/components/ui/button";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Assume 1 to 8 index for periods
const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function TimetableGridClient({ entries, classId }: { entries: any[], classId: string }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this period from the timetable?")) return;
    setLoadingId(id);
    await deleteTimetableEntryAction(id);
    // the server action calls revalidatePath, which will refresh the prop data automatically
    setLoadingId(null);
  };

  // Helper to find the entry for a specific day and period
  const getEntry = (day: string, period: number) => {
    return entries.find(e => e.day === day && e.periodNumber === period);
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="mb-4 flex justify-end">
        <button className={buttonVariants({ variant: "outline", size: "sm" })} onClick={() => window.print()} type="button">
          Print Timetable
        </button>
      </div>
      <div className="min-w-[1000px] rounded-2xl border border-border bg-background shadow-sm overflow-hidden">
        <div className="grid grid-cols-[120px_repeat(6,1fr)] divide-x divide-border border-b border-border bg-muted/30">
          <div className="p-4 flex items-center justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Period</span>
          </div>
          {DAYS.map(day => (
            <div key={day} className="p-4 text-center">
              <span className="text-sm font-bold text-foreground">{day}</span>
            </div>
          ))}
        </div>

        <div className="divide-y divide-border">
          {PERIODS.map(period => (
            <div key={period} className="grid grid-cols-[120px_repeat(6,1fr)] divide-x divide-border">
              {/* Period Number Column */}
              <div className="p-4 flex flex-col items-center justify-center bg-muted/10">
                <span className="text-lg font-black text-foreground">{period}</span>
                {/* Find the first entry for this period to show the generic time, or just omit if inconsistent */}
                <span className="mt-1 flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                  <Clock size={10} />
                  {entries.find(e => e.periodNumber === period)?.startTime || "--:--"}
                </span>
              </div>

              {/* Day Columns */}
              {DAYS.map(day => {
                const entry = getEntry(day, period);
                
                if (!entry) {
                  return (
                    <div key={`${day}-${period}`} className="group relative p-3 transition-colors hover:bg-accent/40 bg-background flex flex-col items-center justify-center min-h-[120px]">
                      <span className="text-xs text-muted-foreground/40 group-hover:hidden">Empty</span>
                      <Link
                        href={`/admin/timetable/new?classId=${classId}&day=${day}&period=${period}`}
                        className="hidden group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary transition-all hover:bg-primary/20 hover:scale-110"
                        title="Add Period"
                      >
                        <Plus size={16} />
                      </Link>
                    </div>
                  );
                }

                const isBreak = entry.periodType === "Break";
                const isPractical = entry.periodType === "Practical";
                
                return (
                  <div 
                    key={entry._id} 
                    className={`group relative p-3 transition-colors min-h-[120px] flex flex-col border border-transparent ${
                      isBreak 
                        ? "bg-amber-50/50 dark:bg-amber-950/20" 
                        : isPractical
                          ? "bg-blue-50/50 dark:bg-blue-950/20"
                          : "bg-background hover:bg-accent/30 hover:border-border"
                    }`}
                  >
                    {/* Content */}
                    <div className="flex-1 text-center flex flex-col items-center justify-center">
                      <h4 className={`text-sm font-bold ${isBreak ? "text-amber-700 dark:text-amber-500" : "text-foreground"}`}>
                        {entry.subject?.name || "Unknown"}
                      </h4>
                      {!isBreak && (
                        <p className="mt-1 text-xs font-semibold text-muted-foreground">
                          {entry.teacher?.name}
                        </p>
                      )}
                      
                      {entry.roomNumber && (
                        <p className="mt-2 flex items-center justify-center gap-1 text-[10px] font-medium text-muted-foreground">
                          <MapPin size={10} />
                          {entry.roomNumber}
                        </p>
                      )}
                    </div>

                    {/* Actions Overlay */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 bg-background/80 backdrop-blur rounded-lg p-1 border shadow-xs">
                      <Link
                        href={`/admin/timetable/${entry._id}/edit`}
                        className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Edit2 size={12} />
                      </Link>
                      <button
                        onClick={() => handleDelete(entry._id)}
                        disabled={loadingId === entry._id}
                        className="flex h-6 w-6 items-center justify-center rounded text-red-600/70 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/40"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
