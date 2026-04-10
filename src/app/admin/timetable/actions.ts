"use server";

import connectDB from "@/lib/mongodb";
import ClassModel from "@/models/Class";
import Subject from "@/models/Subject";
import Teacher from "@/models/Teacher";
import Timetable from "@/models/Timetable";
import { revalidatePath } from "next/cache";

const VALID_DAYS = new Set(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
const VALID_PERIOD_TYPES = new Set(["Theory", "Practical", "Break", "Activity"]);

async function parseTimetableForm(formData: FormData) {
  const classId = (formData.get("classId") as string | null)?.trim();
  const subjectId = (formData.get("subjectId") as string | null)?.trim();
  const teacherId = (formData.get("teacherId") as string | null)?.trim();
  const day = (formData.get("day") as string | null)?.trim();
  const startTime = (formData.get("startTime") as string | null)?.trim();
  const endTime = (formData.get("endTime") as string | null)?.trim();
  const roomNumber = (formData.get("roomNumber") as string | null)?.trim();
  const periodType = (formData.get("periodType") as string | null)?.trim();
  const academicSession = (formData.get("academicSession") as string | null)?.trim();
  const periodNumber = Number.parseInt((formData.get("periodNumber") as string | null) ?? "", 10);

  if (!classId || !subjectId || !teacherId) {
    return { error: "Class, subject, and teacher are required." };
  }

  if (!day || !VALID_DAYS.has(day)) {
    return { error: "Please choose a valid day for this timetable entry." };
  }

  if (!Number.isInteger(periodNumber) || periodNumber < 1 || periodNumber > 10) {
    return { error: "Period number must be between 1 and 10." };
  }

  if (!startTime || !endTime || startTime >= endTime) {
    return { error: "End time must be later than start time." };
  }

  if (!periodType || !VALID_PERIOD_TYPES.has(periodType)) {
    return { error: "Please choose a valid period type." };
  }

  if (!academicSession) {
    return { error: "Academic session is required." };
  }

  const [selectedClass, subject, teacher] = await Promise.all([
    ClassModel.findById(classId).select("grade section").lean(),
    Subject.findById(subjectId).select("_id").lean(),
    Teacher.findOne({ _id: teacherId, status: "Active" }).select("_id").lean(),
  ]);

  if (!selectedClass) {
    return { error: "The selected class could not be found." };
  }

  if (!subject) {
    return { error: "The selected subject could not be found." };
  }

  if (!teacher) {
    return { error: "The selected teacher could not be found or is inactive." };
  }

  return {
    data: {
      classId,
      grade: selectedClass.grade,
      section: selectedClass.section,
      day,
      periodNumber,
      startTime,
      endTime,
      subjectId,
      teacherId,
      roomNumber: roomNumber || undefined,
      periodType,
      academicSession,
    },
  };
}

export async function createTimetableEntryAction(formData: FormData) {
  try {
    await connectDB();
    const parsed = await parseTimetableForm(formData);
    if ("error" in parsed) {
      return { success: false, error: parsed.error };
    }

    await Timetable.create(parsed.data);
    revalidatePath("/admin/timetable");
    revalidatePath(`/admin/timetable/class/${parsed.data.classId}`);
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
    const existingEntry = await Timetable.findById(id).select("classId").lean();
    if (!existingEntry) {
      return { success: false, error: "This timetable entry could not be found." };
    }

    const parsed = await parseTimetableForm(formData);
    if ("error" in parsed) {
      return { success: false, error: parsed.error };
    }

    await Timetable.findByIdAndUpdate(id, parsed.data, { new: true, runValidators: true });
    revalidatePath("/admin/timetable");
    revalidatePath(`/admin/timetable/class/${existingEntry.classId.toString()}`);
    revalidatePath(`/admin/timetable/class/${parsed.data.classId}`);
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
    const existingEntry = await Timetable.findById(id).select("classId").lean();
    if (!existingEntry) {
      return { success: false, error: "This timetable entry could not be found." };
    }

    await Timetable.findByIdAndDelete(id);
    revalidatePath("/admin/timetable");
    revalidatePath(`/admin/timetable/class/${existingEntry.classId.toString()}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
