export const ADMISSION_REQUEST_TYPES = ["Admission Inquiry", "Campus Visit"] as const;
export type AdmissionRequestType = (typeof ADMISSION_REQUEST_TYPES)[number];

export const ADMISSION_STATUSES = [
  "New",
  "Contacted",
  "Visit Requested",
  "Visit Scheduled",
  "Application Started",
  "Closed",
] as const;
export type AdmissionStatus = (typeof ADMISSION_STATUSES)[number];

export type AdmissionSourcePage = "admissions" | "campus" | "admission" | "inquiry";

export const ADMISSION_APPLICATION_STATUSES = [
  "Draft",
  "Documents Pending",
  "Review Scheduled",
  "Ready for Enrollment",
  "Closed",
] as const;
export type AdmissionApplicationStatus = (typeof ADMISSION_APPLICATION_STATUSES)[number];

export const ADMISSION_DOCUMENT_STATUSES = ["Pending", "Received", "Verified", "Waived"] as const;
export type AdmissionDocumentStatus = (typeof ADMISSION_DOCUMENT_STATUSES)[number];

export type AdmissionChecklistItem = {
  key: string;
  label: string;
  status: AdmissionDocumentStatus;
  note?: string;
};

export function getInitialAdmissionStatus(requestType: AdmissionRequestType): AdmissionStatus {
  return requestType === "Campus Visit" ? "Visit Requested" : "New";
}

export function parseOptionalDate(value: FormDataEntryValue | string | null | undefined) {
  if (!value) return null;
  const parsed = new Date(value.toString());
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function getAdmissionStatusBadge(status: AdmissionStatus) {
  if (status === "Closed") return "muted";
  if (status === "Application Started" || status === "Visit Scheduled") return "success";
  if (status === "Visit Requested" || status === "New") return "warning";
  return "default";
}

export function getAdmissionApplicationStatusBadge(status: AdmissionApplicationStatus) {
  if (status === "Closed") return "muted";
  if (status === "Ready for Enrollment") return "success";
  if (status === "Review Scheduled") return "default";
  if (status === "Documents Pending") return "warning";
  return "secondary";
}

export function getDefaultApplicationChecklist(): AdmissionChecklistItem[] {
  return [
    { key: "birth-certificate", label: "Birth certificate / age proof", status: "Pending", note: "" },
    { key: "parent-id", label: "Parent ID and address proof", status: "Pending", note: "" },
    { key: "academic-records", label: "Previous academic records", status: "Pending", note: "" },
    { key: "transfer-certificate", label: "Transfer certificate, if applicable", status: "Pending", note: "" },
    { key: "photos", label: "Student photographs", status: "Pending", note: "" },
  ];
}
