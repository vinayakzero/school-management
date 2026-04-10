"use server";

import connectDB from "@/lib/mongodb";
import Leave from "@/models/Leave";
import Teacher from "@/models/Teacher";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createLeaveAction(formData: FormData) {
  try {
    await connectDB();
    const applicantType = formData.get("applicantType") as string;
    const applicantId = (formData.get("applicantId") as string | null)?.trim();
    const leaveType = formData.get("leaveType") as string;
    const fromDate = new Date(formData.get("fromDate") as string);
    const toDate = new Date(formData.get("toDate") as string);
    const totalDays = Number(formData.get("totalDays"));
    const reason = (formData.get("reason") as string | null)?.trim();

    if (applicantType !== "Teacher") {
      return { success: false, error: "Only teacher leave applications can be logged right now." };
    }

    if (!applicantId) {
      return { success: false, error: "Please select a staff member." };
    }

    if (!reason) {
      return { success: false, error: "Please enter a reason for this leave request." };
    }

    if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
      return { success: false, error: "Please choose a valid leave date range." };
    }

    if (toDate < fromDate) {
      return { success: false, error: "The end date cannot be earlier than the start date." };
    }

    if (!Number.isFinite(totalDays) || totalDays < 0.5) {
      return { success: false, error: "Total days must be at least 0.5." };
    }

    const inclusiveDays = Math.floor((toDate.getTime() - fromDate.getTime()) / 86400000) + 1;
    if (totalDays > inclusiveDays) {
      return { success: false, error: "Total days cannot exceed the selected date range." };
    }

    const teacher = await Teacher.findOne({ _id: applicantId, status: "Active" }).select("_id").lean();
    if (!teacher) {
      return { success: false, error: "The selected teacher could not be found or is inactive." };
    }

    const data = {
      applicantType,
      applicantId,
      leaveType,
      fromDate,
      toDate,
      totalDays,
      reason,
      status: "Pending",
    };
    
    await Leave.create(data);
    revalidatePath("/admin/leaves");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function processLeaveAction(id: string, status: "Approved" | "Rejected", approvalNote: string) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const approvedBy = (session?.user as any)?.id;

    if (!approvedBy) {
      return { success: false, error: "You must be signed in to process leave requests." };
    }

    if (!["Approved", "Rejected"].includes(status)) {
      return { success: false, error: "Please choose a valid leave decision." };
    }

    const leave = await Leave.findById(id).select("status").lean();
    if (!leave) {
      return { success: false, error: "This leave request could not be found." };
    }

    if (leave.status !== "Pending") {
      return { success: false, error: "This leave request has already been processed." };
    }

    await Leave.findByIdAndUpdate(id, {
      status,
      approvalNote: approvalNote.trim(),
      approvedBy,
    });
    
    revalidatePath("/admin/leaves");
    revalidatePath(`/admin/leaves/${id}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteLeaveAction(id: string) {
  try {
    await connectDB();
    await Leave.findByIdAndDelete(id);
    revalidatePath("/admin/leaves");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
