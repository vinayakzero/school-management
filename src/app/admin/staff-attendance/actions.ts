"use server";

import connectDB from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import StaffAttendance from "@/models/StaffAttendance";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

const ALLOWED_STATUSES = new Set(["Present", "Absent", "Late", "Half Day", "On Leave"]);

export async function markStaffAttendanceAction(targetDate: Date, marks: any[]) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const markedBy = (session?.user as any)?.id;

    if (!markedBy) {
      return { success: false, error: "You must be signed in to save attendance." };
    }
    
    // Convert to UTC start of day for consistent querying
    const normalizedDate = new Date(targetDate);
    if (Number.isNaN(normalizedDate.getTime())) {
      return { success: false, error: "Please select a valid attendance date." };
    }
    normalizedDate.setUTCHours(0, 0, 0, 0);

    const validMarks = Array.isArray(marks)
      ? marks.filter(
          (mark) =>
            mark &&
            typeof mark.teacherId === "string" &&
            ALLOWED_STATUSES.has(mark.status)
        )
      : [];

    if (validMarks.length === 0) {
      return { success: false, error: "No attendance entries were provided." };
    }

    const operations = validMarks.map((mark) => ({
      updateOne: {
        filter: { teacherId: mark.teacherId, date: normalizedDate },
        update: {
          $set: {
            status: mark.status,
            inTime: typeof mark.inTime === "string" ? mark.inTime : undefined,
            outTime: typeof mark.outTime === "string" ? mark.outTime : undefined,
            note: typeof mark.note === "string" ? mark.note.trim() : "",
            markedBy,
          },
        },
        upsert: true,
      },
    }));

    if (operations.length > 0) {
      await StaffAttendance.bulkWrite(operations);
    }

    revalidatePath("/admin/staff-attendance");
    revalidatePath("/admin/staff-attendance/history");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
