"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import AdmissionApplication from "@/models/AdmissionApplication";
import AdmissionInquiry from "@/models/AdmissionInquiry";
import Setting from "@/models/Setting";
import {
  ADMISSION_APPLICATION_STATUSES,
  ADMISSION_DOCUMENT_STATUSES,
  ADMISSION_STATUSES,
  getDefaultApplicationChecklist,
  parseOptionalDate,
  type AdmissionApplicationStatus,
  type AdmissionStatus,
} from "@/lib/admissions";

function getFallbackAcademicYear() {
  const year = new Date().getUTCFullYear();
  return `${year}-${year + 1}`;
}

function getAcademicYearCode(academicYear: string) {
  const match = academicYear.match(/\d{4}/);
  return match?.[0] || String(new Date().getUTCFullYear());
}

async function getActiveAcademicYear() {
  const setting = await Setting.findOne().lean();
  return setting?.academicYear || getFallbackAcademicYear();
}

async function generateAdmissionApplicationNumber(academicYear: string) {
  const prefix = `APP-${getAcademicYearCode(academicYear)}-`;
  let sequence = (await AdmissionApplication.countDocuments({ academicYear })) + 1;

  while (true) {
    const applicationNumber = `${prefix}${String(sequence).padStart(4, "0")}`;
    const existing = await AdmissionApplication.exists({ applicationNumber });

    if (!existing) {
      return applicationNumber;
    }

    sequence += 1;
  }
}

export async function deleteAdmissionInquiryAction(id: string) {
  try {
    await connectDB();
    await AdmissionApplication.findOneAndDelete({ inquiry: id });
    await AdmissionInquiry.findByIdAndDelete(id);
    revalidatePath("/admin/admissions");
    revalidatePath("/admin/admissions/applications");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateAdmissionInquiryWorkflowAction(id: string, formData: FormData) {
  const targetPath = `/admin/admissions/${id}`;
  const status = (formData.get("status")?.toString() || "New") as AdmissionStatus;

  if (!ADMISSION_STATUSES.includes(status)) {
    redirect(`${targetPath}?error=invalid-status`);
  }

  try {
    await connectDB();

    const followUpDate = parseOptionalDate(formData.get("followUpDate"));
    const preferredVisitDate = parseOptionalDate(formData.get("preferredVisitDate"));
    const preferredVisitTime = formData.get("preferredVisitTime")?.toString().trim() || "";
    const internalNotes = formData.get("internalNotes")?.toString().trim() || "";

    const lastContactedStatuses: AdmissionStatus[] = ["Contacted", "Visit Scheduled", "Application Started"];

    await AdmissionInquiry.findByIdAndUpdate(id, {
      $set: {
        status,
        followUpDate,
        preferredVisitDate,
        preferredVisitTime,
        internalNotes,
        lastContactedAt: lastContactedStatuses.includes(status) ? new Date() : null,
      },
    });

    revalidatePath("/admin/admissions");
    revalidatePath(`/admin/admissions/${id}`);
    revalidatePath("/admin");
  } catch (error: any) {
    redirect(`${targetPath}?error=${encodeURIComponent(error.message || "save-failed")}`);
  }

  redirect(`${targetPath}?saved=workflow`);
}

export async function startAdmissionApplicationAction(id: string) {
  const sourcePath = `/admin/admissions/${id}`;
  let destination = sourcePath;

  try {
    await connectDB();

    const inquiry = await AdmissionInquiry.findById(id).lean();

    if (!inquiry) {
      throw new Error("inquiry-not-found");
    }

    const existingApplication = await AdmissionApplication.findOne({ inquiry: id }).select("_id").lean();

    if (existingApplication?._id) {
      destination = `/admin/admissions/applications/${existingApplication._id.toString()}?saved=existing`;
    } else {
      const academicYear = await getActiveAcademicYear();
      const applicationNumber = await generateAdmissionApplicationNumber(academicYear);

      const application = await AdmissionApplication.create({
        inquiry: inquiry._id,
        applicationNumber,
        academicYear,
        status: "Draft",
        parentName: inquiry.parentName,
        studentName: inquiry.studentName,
        studentGradeInterest: inquiry.studentGradeInterest,
        email: inquiry.email,
        phone: inquiry.phone,
        applicationNotes: inquiry.message || "",
        counselorNotes: inquiry.internalNotes || "",
        reviewDate: inquiry.followUpDate || null,
        documentChecklist: getDefaultApplicationChecklist(),
      });

      await AdmissionInquiry.findByIdAndUpdate(id, {
        $set: {
          status: "Application Started",
          lastContactedAt: new Date(),
        },
      });

      destination = `/admin/admissions/applications/${application._id.toString()}?saved=created`;
    }

    revalidatePath("/admin/admissions");
    revalidatePath(sourcePath);
    revalidatePath("/admin/admissions/applications");
    revalidatePath("/admin");
  } catch (error: any) {
    redirect(`${sourcePath}?error=${encodeURIComponent(error.message || "start-application-failed")}`);
  }

  redirect(destination);
}

export async function updateAdmissionApplicationAction(id: string, formData: FormData) {
  const targetPath = `/admin/admissions/applications/${id}`;
  const status = (formData.get("status")?.toString() || "Draft") as AdmissionApplicationStatus;

  if (!ADMISSION_APPLICATION_STATUSES.includes(status)) {
    redirect(`${targetPath}?error=invalid-status`);
  }

  try {
    await connectDB();

    const application = await AdmissionApplication.findById(id).lean();

    if (!application) {
      throw new Error("application-not-found");
    }

    const academicYear = formData.get("academicYear")?.toString().trim() || application.academicYear || getFallbackAcademicYear();
    const reviewDate = parseOptionalDate(formData.get("reviewDate"));
    const applicationNotes = formData.get("applicationNotes")?.toString().trim() || "";
    const counselorNotes = formData.get("counselorNotes")?.toString().trim() || "";
    const parentName = formData.get("parentName")?.toString().trim() || application.parentName;
    const studentName = formData.get("studentName")?.toString().trim() || application.studentName;
    const studentGradeInterest = formData.get("studentGradeInterest")?.toString().trim() || application.studentGradeInterest;
    const email = formData.get("email")?.toString().trim().toLowerCase() || application.email;
    const phone = formData.get("phone")?.toString().trim() || application.phone;

    const documentChecklist = (application.documentChecklist || []).map((item) => {
      const nextStatus = formData.get(`checklistStatus:${item.key}`)?.toString();
      const nextNote = formData.get(`checklistNote:${item.key}`)?.toString().trim() || "";

      return {
        key: item.key,
        label: item.label,
        status: ADMISSION_DOCUMENT_STATUSES.includes(nextStatus as any) ? nextStatus : item.status,
        note: nextNote,
      };
    });

    await AdmissionApplication.findByIdAndUpdate(id, {
      $set: {
        academicYear,
        status,
        parentName,
        studentName,
        studentGradeInterest,
        email,
        phone,
        applicationNotes,
        counselorNotes,
        reviewDate,
        documentChecklist,
      },
    });

    await AdmissionInquiry.findByIdAndUpdate(application.inquiry, {
      $set: {
        status: status === "Closed" ? "Closed" : "Application Started",
        followUpDate: reviewDate,
        internalNotes: counselorNotes,
        lastContactedAt: new Date(),
      },
    });

    revalidatePath("/admin/admissions");
    revalidatePath(`/admin/admissions/${application.inquiry.toString()}`);
    revalidatePath("/admin/admissions/applications");
    revalidatePath(targetPath);
    revalidatePath("/admin");
  } catch (error: any) {
    redirect(`${targetPath}?error=${encodeURIComponent(error.message || "save-failed")}`);
  }

  redirect(`${targetPath}?saved=application`);
}
