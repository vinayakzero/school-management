"use server";

import connectDB from "@/lib/mongodb";
import Timetable from "@/models/Timetable";
import { revalidatePath } from "next/cache";

export async function createTimetableEntryAction(formData: FormData) {
  try {
    await connectDB();
    const data = Object.fromEntries(formData);
    
    // Convert periodNumber to number
    data.periodNumber = parseInt(data.periodNumber as string, 10) as any;

    await Timetable.create(data);
    revalidatePath("/admin/timetable");
    return { success: true };
  } catch (error: any) {
    if (error.code === 11000) {
      return { success: false, error: "A scheduling conflict occurred. A period is already scheduled for this class, or the teacher is already busy at this time." };
    }
    return { success: false, error: error.message };
  }
}

export async function updateTimetableEntryAction(id: string, formData: FormData) {
  try {
    await connectDB();
    const data = Object.fromEntries(formData);
    data.periodNumber = parseInt(data.periodNumber as string, 10) as any;

    await Timetable.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    revalidatePath("/admin/timetable");
    revalidatePath(`/admin/timetable/class/${data.classId}`);
    return { success: true };
  } catch (error: any) {
    if (error.code === 11000) {
      return { success: false, error: "A scheduling conflict occurred. A period is already scheduled for this class, or the teacher is already busy at this time." };
    }
    return { success: false, error: error.message };
  }
}

export async function deleteTimetableEntryAction(id: string) {
  try {
    await connectDB();
    await Timetable.findByIdAndDelete(id);
    revalidatePath("/admin/timetable");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
