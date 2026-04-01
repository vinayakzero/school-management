"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { addExamAction, updateExamAction } from "./actions";
import { AdminPageHeader } from "@/components/admin/page-header";
import { buttonVariants } from "@/components/ui/button";

export default function ExamForm({
  subjects,
  examToEdit,
  backHref = "/admin/exams",
}: {
  subjects: any[];
  examToEdit?: any;
  backHref?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const selected = formData.get("subjectSelection")?.toString();
    if (!selected) {
      setError("Please select a valid subject.");
      setLoading(false);
      return;
    }

    const [subId, grade, subName] = selected.split("|");
    formData.append("subjectId", subId);
    formData.append("grade", grade);
    
    // For editing, we might not want to force appending Suffix if name is already complete, 
    // but the current model uses name as a separate field.
    // If examToEdit is present, we interpret nameSuffix differently or use a dedicated name field.
    formData.append("name", `${subName} ${formData.get("nameSuffix")}`);

    const res = examToEdit 
      ? await updateExamAction(examToEdit._id, formData)
      : await addExamAction(formData);

    if (res.success) {
      router.push("/admin/exams");
      router.refresh();
    } else {
      setError(res.error || "Something went wrong.");
      setLoading(false);
    }
  };

  const defaultSubjectVal = examToEdit 
    ? `${examToEdit.subject?._id || examToEdit.subject}|${examToEdit.grade}|${examToEdit.subject?.name || ""}` 
    : "";
  
  const initialNameSuffix = examToEdit?.name?.replace(examToEdit.subject?.name || "", "").trim() || "";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <AdminPageHeader
        eyebrow="Route-Based Workflow"
        title={examToEdit ? "Edit Exam" : "Schedule New Exam"}
        description={examToEdit ? `Update details for ${examToEdit.name} from a dedicated edit route.` : "Create exam records from a dedicated page instead of a popup."}
      >
        <Link href={backHref} className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft size={16} />
          Back to Exams
        </Link>
      </AdminPageHeader>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="p-6">
          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="mb-1.5 block font-semibold text-gray-700 dark:text-zinc-300">Subject & Grade *</label>
              <select
                name="subjectSelection"
                required
                defaultValue={defaultSubjectVal}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                autoFocus={!examToEdit}
              >
                <option value="">Select Target Subject...</option>
                {subjects.map(sub => (
                  <option key={sub._id} value={`${sub._id}|${sub.grade}|${sub.name}`}>
                    {sub.grade} - {sub.name} ({sub.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block font-semibold text-gray-700 dark:text-zinc-300">Exam Term / Name Suffix *</label>
              <input
                type="text"
                name="nameSuffix"
                required
                defaultValue={initialNameSuffix}
                placeholder="e.g. Midterm 2024"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
              <p className="mt-1 text-xs text-gray-500">This will be appended to the Subject name.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block font-semibold text-gray-700 dark:text-zinc-300">Date *</label>
                <input
                  type="date"
                  name="date"
                  required
                  defaultValue={examToEdit?.date ? new Date(examToEdit.date).toISOString().split("T")[0] : ""}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-semibold text-gray-700 dark:text-zinc-300">Total Marks Format *</label>
                <input
                  type="number"
                  name="totalMarks"
                  required
                  min={10}
                  max={100}
                  defaultValue={examToEdit?.totalMarks || 100}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Link href={backHref} className={`${buttonVariants({ variant: "outline" })} flex-1`}>
                Cancel
              </Link>
              <button type="submit" disabled={loading} className={`${buttonVariants({ variant: "default" })} flex-1`}>
                {loading ? "Saving..." : examToEdit ? "Update Exam" : "Create Exam"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
