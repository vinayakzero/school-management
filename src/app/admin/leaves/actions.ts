"use server";

import connectDB from "@/lib/mongodb";
import Leave from "@/models/Leave";
import { revalidatePath } from "next/cache";

export async function createLeaveAction(formData: FormData) {
  try {
    await connectDB();
    const data = {
      applicantType: formData.get("applicantType") as string,
      applicantId: formData.get("applicantId") as string,
      leaveType: formData.get("leaveType") as string,
      fromDate: new Date(formData.get("fromDate") as string),
      toDate: new Date(formData.get("toDate") as string),
      totalDays: Number(formData.get("totalDays")),
      reason: formData.get("reason") as string,
      status: "Pending",
    };
    
    await Leave.create(data);
    revalidatePath("/admin/leaves");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function processLeaveAction(id: string, status: "Approved" | "Rejected", approvalNote: string, approvedBy: string) {
  try {
    await connectDB();
    await Leave.findByIdAndUpdate(id, {
      status,
      approvalNote,
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
