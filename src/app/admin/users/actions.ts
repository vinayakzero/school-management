"use server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function createUserAction(formData: FormData) {
  try {
    await connectDB();
    const password = formData.get("password") as string;
    if (!password || password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters." };
    }
    const passwordHash = await bcrypt.hash(password, 12);
    await User.create({
      name: formData.get("name") as string,
      email: (formData.get("email") as string).toLowerCase().trim(),
      passwordHash,
      role: formData.get("role") as string,
      linkedId: formData.get("linkedId") || undefined,
      status: "Active",
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    if (error?.code === 11000) return { success: false, error: "A user with this email already exists." };
    return { success: false, error: error.message };
  }
}

export async function updateUserAction(id: string, formData: FormData) {
  try {
    await connectDB();
    const updateData: Record<string, any> = {
      name: formData.get("name") as string,
      email: (formData.get("email") as string).toLowerCase().trim(),
      role: formData.get("role") as string,
      status: formData.get("status") as string,
    };
    const newPassword = formData.get("newPassword") as string;
    if (newPassword && newPassword.length >= 6) {
      updateData.passwordHash = await bcrypt.hash(newPassword, 12);
    }
    await User.findByIdAndUpdate(id, updateData, { new: true });
    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${id}/edit`);
    return { success: true };
  } catch (error: any) {
    if (error?.code === 11000) return { success: false, error: "A user with this email already exists." };
    return { success: false, error: error.message };
  }
}

export async function deactivateUserAction(id: string) {
  try {
    await connectDB();
    await User.findByIdAndUpdate(id, { status: "Inactive" });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteUserAction(id: string) {
  return deactivateUserAction(id);
}
