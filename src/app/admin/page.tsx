import { Users, GraduationCap, School, CreditCard, ArrowRight, CalendarDays, ClipboardCheck, ClipboardList, Receipt, UserPlus } from "lucide-react";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import ClassModel from "@/models/Class";
import Payment from "@/models/Payment";
import Setting from "@/models/Setting";
import Link from "next/link";
import type { ReactNode } from "react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminMetricCard } from "@/components/admin/metric-card";
import { AdminSectionCard } from "@/components/admin/section-card";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await connectDB();

  const [totalStudents, totalTeachers, activeClasses, paymentAgg, outstandingAgg, recentStudents, setting] = await Promise.all([
    Student.countDocuments(),
    Teacher.countDocuments(),
    ClassModel.countDocuments(),
    Payment.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
    Student.aggregate([{ $group: { _id: null, total: { $sum: "$fees.pending" } } }]),
    Student.find().sort({ enrollmentDate: -1, _id: -1 }).limit(4).lean(),
    Setting.findOne().lean(),
  ]);

  const currencySymbol = setting?.currencySymbol || "$";
  const feesCollected = paymentAgg[0]?.total || 0;
  const outstandingFees = outstandingAgg[0]?.total || 0;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Admin Foundation"
        title="School Operations Overview"
        description="Review the health of your school office in one place: enrollment, staffing, class activity, and fee-office movement."
      >
        <Link href="/admin/students/new" className={buttonVariants({ variant: "outline" })}>
          <UserPlus size={16} />
          New Student
        </Link>
        <Link href="/admin/fees" className={buttonVariants({ variant: "default" })}>
          <Receipt size={16} />
          Open Fee Office
        </Link>
      </AdminPageHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard
          label="Total Students"
          value={totalStudents.toLocaleString()}
          description="Live enrollment records"
          tone="primary"
          icon={<Users className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Total Teachers"
          value={totalTeachers.toLocaleString()}
          description="Faculty records active in the system"
          tone="emerald"
          icon={<GraduationCap className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Active Classes"
          value={activeClasses.toLocaleString()}
          description="Grade-section structures in operation"
          tone="amber"
          icon={<School className="h-5 w-5" />}
        />
        <AdminMetricCard
          label="Fees Collected"
          value={`${currencySymbol}${feesCollected.toLocaleString()}`}
          description={`${currencySymbol}${outstandingFees.toLocaleString()} outstanding`}
          tone="violet"
          icon={<CreditCard className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <AdminSectionCard
          title="Recent Student Records"
          description="The latest enrollments and updates entering the school office workflow."
          action={
            <Link href="/admin/students" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              View all
              <ArrowRight size={15} />
            </Link>
          }
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/60 hover:bg-muted/60">
                <TableHead>Student</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Open</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentStudents.map((student: any) => (
                <TableRow key={student._id.toString()}>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.email || "Student profile"}</p>
                    </div>
                  </TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Active" ? "success" : student.status === "Pending" ? "warning" : "muted"}>
                      {student.status || "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(student.enrollmentDate || student.createdAt || Date.now()).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/admin/students/${student._id.toString()}`}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      Open
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {recentStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                    No recent students found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </AdminSectionCard>

        <AdminSectionCard
          title="Priority Actions"
          description="Direct entry points for the workflows used most often during the school day."
        >
          <div className="grid gap-3 p-6">
            <QuickActionLink
              href="/admin/students/new"
              label="Add New Student"
              description="Open the enrollment form with admission, guardian, and academic fields."
              icon={<UserPlus size={18} />}
            />
            <QuickActionLink
              href="/admin/admissions"
              label="Review Admissions"
              description="Track new inquiries, campus visit requests, and pipeline follow-ups."
              icon={<ClipboardList size={18} />}
            />
            <QuickActionLink
              href="/admin/exams/new"
              label="Schedule Exam"
              description="Create subject-specific exams and sync them into the calendar."
              icon={<ClipboardCheck size={18} />}
            />
            <QuickActionLink
              href="/admin/fees/payments/new"
              label="Record Payment"
              description="Capture collections, concessions, and receipt-ready entries."
              icon={<Receipt size={18} />}
            />
            <QuickActionLink
              href="/admin/calendar/new"
              label="Plan Calendar Event"
              description="Add holidays, meetings, and school activities from a dedicated route."
              icon={<CalendarDays size={18} />}
            />
          </div>
        </AdminSectionCard>
      </div>
    </div>
  );
}

function QuickActionLink({
  href,
  label,
  description,
  icon,
}: {
  href: string;
  label: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-border/80 bg-background/80 p-4 transition-colors hover:border-primary/20 hover:bg-accent/50"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">{icon}</div>
        <div>
          <p className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">{label}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}
