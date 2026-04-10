"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import AdmissionInquiry from "@/models/AdmissionInquiry";
import { getInitialAdmissionStatus, parseOptionalDate, type AdmissionRequestType, type AdmissionSourcePage } from "@/lib/admissions";

function readRequiredValue(formData: FormData, key: string) {
  const value = formData.get(key)?.toString().trim() || "";
  if (!value) {
    throw new Error(`Missing required field: ${key}`);
  }
  return value;
}

function readOptionalValue(formData: FormData, key: string) {
  return formData.get(key)?.toString().trim() || "";
}

function getSafeSourcePath(value: string) {
  if (value === "/campus") return "/campus";
  if (value === "/inquiry") return "/inquiry";
  if (value === "/admission") return "/admission";
  return "/admissions";
}

async function createAdmissionRecord(formData: FormData) {
  await connectDB();

  const requestType = readRequiredValue(formData, "requestType") as AdmissionRequestType;
  const sourcePage = readRequiredValue(formData, "sourcePage") as AdmissionSourcePage;
  const sourcePath = getSafeSourcePath(readRequiredValue(formData, "sourcePath"));

  const record = await AdmissionInquiry.create({
    parentName: readRequiredValue(formData, "parentName"),
    studentName: readRequiredValue(formData, "studentName"),
    studentGradeInterest: readRequiredValue(formData, "studentGradeInterest"),
    email: readRequiredValue(formData, "email").toLowerCase(),
    phone: readRequiredValue(formData, "phone"),
    message: readOptionalValue(formData, "message"),
    requestType,
    status: getInitialAdmissionStatus(requestType),
    sourcePage,
    sourcePath,
    preferredVisitDate: parseOptionalDate(formData.get("preferredVisitDate")),
    preferredVisitTime: readOptionalValue(formData, "preferredVisitTime"),
  });

  revalidatePath("/admin/admissions");
  revalidatePath("/admin");

  return { record, sourcePath };
}

export async function submitAdmissionInquiryAction(formData: FormData) {
  const sourcePath = getSafeSourcePath(readOptionalValue(formData, "sourcePath"));
  try {
    await createAdmissionRecord(formData);
  } catch {
    redirect(`${sourcePath}?error=submission-failed`);
  }

  redirect(`${sourcePath}?submitted=admission-inquiry`);
}

export async function submitCampusVisitAction(formData: FormData) {
  const sourcePath = getSafeSourcePath(readOptionalValue(formData, "sourcePath") || "/campus");
  try {
    await createAdmissionRecord(formData);
  } catch {
    redirect(`${sourcePath}?error=submission-failed`);
  }

  redirect(`${sourcePath}?submitted=campus-visit`);
}
