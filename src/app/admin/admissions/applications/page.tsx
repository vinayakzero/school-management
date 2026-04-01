import connectDB from "@/lib/mongodb";
import AdmissionApplication from "@/models/AdmissionApplication";
import Setting from "@/models/Setting";
import ApplicationsClient from "./ApplicationsClient";

export const dynamic = "force-dynamic";

export default async function AdmissionApplicationsPage() {
  await connectDB();

  const [applications, setting] = await Promise.all([
    AdmissionApplication.find()
      .populate("inquiry", "requestType status sourcePage sourcePath preferredVisitDate followUpDate createdAt")
      .sort({ createdAt: -1 })
      .lean(),
    Setting.findOne().lean(),
  ]);

  return (
    <ApplicationsClient
      applications={JSON.parse(JSON.stringify(applications))}
      activeAcademicYear={setting?.academicYear || ""}
    />
  );
}
