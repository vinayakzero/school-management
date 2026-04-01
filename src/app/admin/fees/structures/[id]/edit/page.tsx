import mongoose from "mongoose";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import FeeStructure from "@/models/FeeStructure";
import FeeStructureForm from "../../../FeeStructureForm";

export const dynamic = "force-dynamic";

export default async function EditFeeStructurePage({ params }: { params: { id: string } }) {
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound();
  }

  await connectDB();
  const feeStructure = await FeeStructure.findById(params.id).lean();

  if (!feeStructure) {
    notFound();
  }

  return <FeeStructureForm feeStructure={JSON.parse(JSON.stringify(feeStructure))} />;
}
