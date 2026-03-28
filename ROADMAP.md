# 🏫 School Management System — Development Roadmap

> **Stack**: Next.js 14 (App Router) · TypeScript · MongoDB (Atlas) · Mongoose · Tailwind CSS · Lucide Icons  
> **Database**: `skool` on MongoDB Atlas  
> **Last Updated**: 2026-03-28

---

## ✅ What's Built So Far

| Module | Status | Notes |
|--------|--------|-------|
| Project setup (Next.js + Tailwind + MongoDB) | ✅ Done | Connected to `skool` Atlas DB |
| Home landing page | ✅ Done | `/` — splash page with CTA |
| Admin layout (sidebar + header) | ✅ Done | `/admin/layout.tsx` |
| Admin dashboard overview | ✅ Done | Live student/teacher counts from DB |
| Student list page | ✅ Done | `/admin/students` — dynamic from MongoDB |
| Teacher list page | ✅ Done | `/admin/teachers` — dynamic from MongoDB |
| Attendance recording | ✅ Done | `/admin/attendance` — per class/date, 4 statuses, upsert |
| MongoDB models: Student, Teacher, Attendance | ✅ Done | Full Mongoose schemas |
| Data seed script | ✅ Done | `scripts/seed.ts` |

---

## 🗺️ Development Phases

---

### Phase 1 — Core Entity Management *(In Progress)*

**Goal**: Complete full CRUD (Create, Read, Update, Delete) operations for Students and Teachers so the system actually manages data — not just displays it.

#### 1.1 Student Management
- [x] **Add Student** — Modal form; validate + insert to DB via Server Action
- [x] **Edit Student** — Pre-filled form per student ID; update via Server Action  
- [x] **Delete Student** — Confirmation dialog; hard-delete from DB
- [x] **Student Profile Page** `/admin/students/[id]` — Full detail view with attendance summary, personal & academic info

#### 1.2 Teacher Management
- [x] **Add Teacher** — Form with subject, qualification, experience, salary, etc.
- [x] **Edit Teacher** — Pre-filled update form per teacher ID
- [x] **Delete Teacher** — Confirmation dialog
- [x] **Teacher Profile Page** `/admin/teachers/[id]` — Full detail view with assigned classes panel

#### 1.3 Class/Section Management
- [x] **Class Model** — `Class.ts` schema (grade, section, capacity, classTeacher)
- [x] **Classes List** `/admin/classes` — View and manage all classes
- [x] **Assign Class Teacher** — Link a Teacher document to a Class

---

### Phase 2 — Attendance System *(Partially Done)*

**Goal**: Complete the daily attendance lifecycle — recording, history, reports, and parent notification hooks.

#### 2.1 Recording (Done ✅)
- [x] Per-class per-date attendance form with Present / Absent / Late / Excused statuses
- [x] Upsert logic — editing a day's attendance updates existing record

#### 2.2 Attendance History
- [x] **Attendance History Page** `/admin/attendance/history` — Filter by student or class + date range, view past records in a table
- [ ] **Individual Student Attendance report** — On the Student Profile Page, show a monthly attendance summary (no. of days present, absent, %age)

#### 2.3 Attendance Reports
- [ ] **Class-level Report** — Attendance percentage per student in a class for a chosen date range
- [ ] **School-wide Summary** — Daily count of absentees across all grades

---

### Phase 3 — Academics Module

**Goal**: Track classes, subjects, exams, and grade reports for students.

#### 3.1 Subject Management
- [ ] **Subject Model** — `Subject.ts` (name, code, grade, assignedTeacher)
- [ ] **Subjects Page** `/admin/subjects` — List, add, edit, delete subjects

#### 3.2 Examination & Marks
- [ ] **Exam Model** — `Exam.ts` (name, subject, grade, date, totalMarks)
- [ ] **Result Model** — `Result.ts` (student, exam, marksObtained, grade)
- [ ] **Exams Page** `/admin/exams` — Schedule and manage exams
- [ ] **Enter Marks** — Form for teachers to submit marks per exam
- [ ] **Report Card View** `/admin/students/[id]/results` — Visual grade card per student

---

### Phase 4 — Fee Management

**Goal**: Track fee schedules, payments, dues, and generate receipts.

- [ ] **Fee Structure Model** — `FeeStructure.ts` (grade, amount, dueDate, category: Tuition/Transport/etc.)
- [ ] **Payment Model** — `Payment.ts` (studentId, amount, date, mode: Cash/Online, receiptNo)
- [ ] **Fee Collection Page** `/admin/fees` — View all fees, filter by paid/unpaid
- [ ] **Record Payment** — Form to log a payment; auto-update student balance
- [ ] **Fee Report** — Outstanding dues per class or per student
- [ ] **Receipt Generation** — Printable HTML payment receipt page

---

### Phase 5 — Calendar & Events

**Goal**: Master school calendar visible to admin, teachers, and eventually students/parents.

- [ ] **Event Model** — `Event.ts` (title, type: Holiday/Exam/Meeting, startDate, endDate, audience)
- [ ] **Calendar Page** `/admin/calendar` — Monthly/weekly calendar view
- [ ] **Add Event** — Simple form to add holidays, exam schedules, parent meeting days
- [ ] **Holiday Management** — Define school holidays; affects attendance tracking auto-fill

---

### Phase 6 — Authentication & Roles

**Goal**: Secure the dashboard with login and role-based access control.

- [ ] **NextAuth.js** setup with Credentials provider
- [ ] **User Model** — `User.ts` (email, passwordHash, role: "admin" | "teacher")
- [ ] **Login Page** `/login` — Styled login form
- [ ] **Route Guards** — Protect all `/admin/**` routes with session check (Next.js middleware)
- [ ] **Teacher Portal** `/teacher/**` — Scoped dashboard: only see their classes, enter marks, submit attendance

---

### Phase 7 — Notification System

**Goal**: Keep parents informed automatically.

- [ ] **Email Notifications** (nodemailer or Resend) — Absence alerts to parents
- [ ] **Announcement Model** — `Announcement.ts` (title, body, audience, date)
- [ ] **Announcement Management** — Admin can draft and send school-wide announcements
- [ ] **SMS hook (stretch goal)** — Integrate Twilio or similar service for absence/fee SMS alerts

---

### Phase 8 — Analytics & Reporting

**Goal**: Give administrators actionable insights at a glance.

- [ ] **Attendance Trends** — Chart showing school-wide attendance over time
- [ ] **Grade Distribution** — Bar chart of score distribution per exam
- [ ] **Fee Collection Progress** — Pie chart of collected vs outstanding fees
- [ ] **Top/Bottom Performers** — Ranked student list by average score
- [ ] Charting library integration (e.g., `recharts` or `chart.js`)

---

## 📁 File & Folder Convention

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx           ← Dashboard overview
│   │   ├── layout.tsx         ← Sidebar + header
│   │   ├── students/          ← Student list + [id] profile
│   │   ├── teachers/          ← Teacher list + [id] profile
│   │   ├── attendance/        ← Attendance recorder + history
│   │   ├── classes/           ← Phase 1.3
│   │   ├── exams/             ← Phase 3.2
│   │   ├── fees/              ← Phase 4
│   │   └── calendar/          ← Phase 5
│   ├── login/                 ← Phase 6
│   └── page.tsx               ← Landing page
├── models/
│   ├── Student.ts
│   ├── Teacher.ts
│   ├── Attendance.ts
│   ├── Class.ts               ← Phase 1.3
│   ├── Subject.ts             ← Phase 3.1
│   ├── Exam.ts                ← Phase 3.2
│   ├── Result.ts              ← Phase 3.2
│   ├── FeeStructure.ts        ← Phase 4
│   ├── Payment.ts             ← Phase 4
│   ├── Event.ts               ← Phase 5
│   └── User.ts                ← Phase 6
└── lib/
    └── mongodb.ts             ← DB connection singleton
```

---

## 🚦 Current Priority

> **Phase 3.1** — Subject Management: create subjects, link to grades, and assign teachers.

---

*This document is the single source of truth for the development roadmap. Update the checkboxes as features are completed.*
