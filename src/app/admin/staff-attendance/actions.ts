"use server";

import connectDB from "@/lib/mongodb";
import StaffAttendance from "@/models/StaffAttendance";
import { revalidatePath } from "next/cache";

export async function markStaffAttendanceAction(targetDate: Date, marks: any[]) {
  try {
    await connectDB();
    
    // Convert to UTC start of day for consistent querying
    const normalizedDate = new Date(targetDate);
    normalizedDate.setUTCHours(0, 0, 0, 0);

    const operations = marks.map((mark) => ({
      updateOne: {
        filter: { teacherId: mark.teacherId, date: normalizedDate },
        update: {
          $set: {
            status: mark.status,
            inTime: mark.inTime,
            outTime: mark.outTime,
            note: mark.note,
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
