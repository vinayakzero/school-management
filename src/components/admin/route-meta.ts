import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Calendar,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  School,
  Settings,
  Users,
  Wallet,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Overview",
    description: "Track school health, collections, and recent records.",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/students",
    label: "Students",
    description: "Manage records, lifecycle actions, results, and documents.",
    icon: Users,
  },
  {
    href: "/admin/admissions",
    label: "Admissions",
    description: "Track inquiries, campus visits, and enrollment pipeline readiness.",
    icon: ClipboardList,
  },
  {
    href: "/admin/teachers",
    label: "Teachers",
    description: "Faculty records, profiles, and class assignments.",
    icon: GraduationCap,
  },
  {
    href: "/admin/classes",
    label: "Classes",
    description: "Grade-section structure and class teacher assignment.",
    icon: School,
  },
  {
    href: "/admin/subjects",
    label: "Subjects",
    description: "Subject mapping and teacher ownership.",
    icon: BookOpen,
  },
  {
    href: "/admin/courses",
    label: "Courses",
    description: "Grade-wise academic programs and structures.",
    icon: School,
  },
  {
    href: "/admin/syllabus",
    label: "Syllabus",
    description: "Unit plans, books, and assessment patterns.",
    icon: FileText,
  },
  {
    href: "/admin/exams",
    label: "Exams",
    description: "Scheduling, marks entry, and print-ready timetables.",
    icon: ClipboardCheck,
  },
  {
    href: "/admin/attendance",
    label: "Attendance",
    description: "Daily registers, reports, and holiday-aware recording.",
    icon: Calendar,
  },
  {
    href: "/admin/calendar",
    label: "Calendar",
    description: "Holidays, meetings, exams, and annual planning.",
    icon: CalendarDays,
  },
  {
    href: "/admin/fees",
    label: "Fees",
    description: "Structures, collections, receipts, and office reporting.",
    icon: Wallet,
  },
  {
    href: "/admin/templates",
    label: "Templates",
    description: "Certificates, reports, IDs, and print layouts.",
    icon: FileText,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    description: "School identity, academic year, and system defaults.",
    icon: Settings,
  },
];

const SEGMENT_LABELS: Record<string, string> = {
  new: "New",
  edit: "Edit",
  preview: "Preview",
  timetable: "Timetable",
  history: "History",
  reports: "Reports",
  register: "Register",
  structures: "Structures",
  payments: "Payments",
  receipts: "Receipts",
  documents: "Documents",
  operations: "Operations",
  results: "Results",
  "daily-collection": "Daily Collection",
};

export function getActiveAdminItem(pathname: string) {
  if (pathname === "/admin") {
    return ADMIN_NAV_ITEMS[0];
  }

  return (
    ADMIN_NAV_ITEMS.find((item) => item.href !== "/admin" && pathname.startsWith(item.href)) ||
    ADMIN_NAV_ITEMS[0]
  );
}

function titleizeSegment(segment: string) {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  if (/^[0-9a-f]{24}$/i.test(segment)) return "Details";

  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getAdminBreadcrumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const breadcrumbs = [{ href: "/admin", label: "Admin" }];

  let currentPath = "";
  for (const part of parts) {
    currentPath += `/${part}`;
    if (part === "admin") continue;
    breadcrumbs.push({
      href: currentPath,
      label: titleizeSegment(part),
    });
  }

  return breadcrumbs;
}
