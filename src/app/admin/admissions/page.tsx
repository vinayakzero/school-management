import connectDB from "@/lib/mongodb";
import AdmissionInquiry from "@/models/AdmissionInquiry";
import AdmissionApplication from "@/models/AdmissionApplication";
import AdmissionsClient from "./AdmissionsClient";

export const dynamic = "force-dynamic";

export default async function AdmissionsPage() {
  await connectDB();
  const [leads, applicationCount] = await Promise.all([
    AdmissionInquiry.find().sort({ createdAt: -1 }).lean(),
    AdmissionApplication.countDocuments(),
  ]);

  return <AdmissionsClient leads={JSON.parse(JSON.stringify(leads))} applicationCount={applicationCount} />;
}
