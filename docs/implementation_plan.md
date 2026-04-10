# School Management System — ERP Expansion Implementation Plan

> **Scope:** Admin Panel expansion + Authentication + Seed Data  
> **Stack:** Next.js 14 App Router · TypeScript · MongoDB/Mongoose · Tailwind CSS · shadcn/ui  
> **Out of scope this phase:** Analytics dashboards, Payment gateways, Teacher/Parent portals  
> **Reference:** Franciscan e-Care ERP feature set  
> **Repository:** `f:\GIT\school-management`

---

## Architecture & Patterns (Established — Must Follow)

The codebase has a clear, consistent pattern. **Every new module must follow it exactly.**

### File Structure Per Module
```
src/app/admin/<module>/
├── page.tsx              ← Server component: fetch data, render <ModuleClient />
├── actions.ts            ← "use server" — createX, updateX, deleteX, runXOperation
├── <Module>Client.tsx    ← "use client" — list page with search, table, delete
├── <Module>Form.tsx      ← "use client" — reusable create/edit form
├── new/
│   └── page.tsx          ← Server component wrapping <ModuleForm />
└── [id]/
    ├── page.tsx          ← Detail/profile page (server)
    └── edit/
        └── page.tsx      ← Server component wrapping <ModuleForm mode="edit" />
```

### Component Conventions
- **`AdminPageHeader`** — every list page top banner
- **`AdminSectionCard`** — wraps tables and form panels
- **`AdminEmptyState`** — empty list states
- **`AdminMetricCard`** — dashboard KPI cards
- **`Badge`** — status chips (variant: `success`, `warning`, `muted`, `outline`)
- **`Table, TableHeader, TableRow, TableCell`** — all data tables
- **`buttonVariants`** + `Link` — navigation CTAs

### Server Actions Pattern
```ts
"use server";
export async function createXAction(formData: FormData) { ... }
export async function updateXAction(id: string, formData: FormData) { ... }
export async function deleteXAction(id: string) { ... }
```

### Navigation Registration
Every new module must be added to:
- `src/components/admin/route-meta.ts` → `ADMIN_NAV_ITEMS[]`
- `src/lib/mongodb.ts` → model pre-registration import

---

## Phase 0 — Authentication & Login (Do First)

**Why first:** Auth is the foundation. Login page must work before any portals open.  
**Strategy:** Use `next-auth` with `CredentialsProvider`. Simple bcrypt password check against a `User` collection.

### New Model: `User`

```ts
// src/models/User.ts
{
  name: String,
  email: String (unique, required),
  passwordHash: String (required),
  role: enum ['super_admin', 'admin', 'accountant', 'teacher', 'parent'],
  linkedId: ObjectId (optional — links teacher role → Teacher._id, parent → Student._id),
  status: enum ['Active', 'Inactive'],
  lastLogin: Date,
  createdAt, updatedAt
}
```

### New Files
| File | Purpose |
|---|---|
| `src/models/User.ts` | User model with role |
| `src/app/api/auth/[...nextauth]/route.ts` | NextAuth API handler |
| `src/lib/auth.ts` | `authOptions` config, session types |
| `src/middleware.ts` | Route protection — blocks `/admin/**` if not authenticated |
| `src/app/login/page.tsx` | Single login page |
| `src/app/login/LoginClient.tsx` | Login form + **Test Mode Quick-Login buttons** |
| `src/app/admin/users/` | User management CRUD (admin only) |

### Login Page Design
- **Single clean page** — school branding, email + password form
- **"Test Quick Login" panel** — one button per role that pre-fills and submits credentials:
  - 🔴 **Super Admin** — `superadmin@school.edu` / `Admin@123`
  - 🔵 **Admin** — `admin@school.edu` / `Admin@123`
  - 🟢 **Accountant** — `accounts@school.edu` / `Admin@123`
  - 🟡 **Teacher** — `teacher1@school.edu` / `Admin@123`
  - 🟣 **Parent** — `parent1@school.edu` / `Admin@123`
- After login → redirect based on role: Admin roles → `/admin`, Teacher → `/admin` (same for now), Parent → `/admin`

### Packages to Install
```bash
npm install next-auth bcryptjs
npm install -D @types/bcryptjs
```

### Middleware Logic
```
/admin/** → require session, any role with admin access
/login    → public, redirect to /admin if already logged in
```

---

## Phase 1 — New Module: Timetable Manager

**Priority:** Highest — biggest missing operational module.

### New Model: `Timetable`
```ts
// src/models/Timetable.ts
{
  classId: ObjectId → Class,
  grade: String,
  section: String,
  day: enum ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  periodNumber: Number (1–8),
  startTime: String ('08:00'),
  endTime: String ('08:45'),
  subjectId: ObjectId → Subject,
  teacherId: ObjectId → Teacher,
  roomNumber: String,
  periodType: enum ['Regular','Break','Assembly','Free'],
  academicSession: String,
  createdAt, updatedAt
}
```

### Routes
```
/admin/timetable                  ← List by class filter
/admin/timetable/new              ← Create period entry
/admin/timetable/[id]/edit        ← Edit period
/admin/timetable/class/[classId]  ← Class-wise full timetable grid view + print
```

### Features
- Filter timetable by Grade → Section → Day
- Grid view: rows = periods (1–8), columns = Mon–Sat, cells = Subject + Teacher
- Conflict detection: warn if teacher or room is double-booked in same day+period
- Print view: `/admin/timetable/class/[classId]?print=true`

---

## Phase 2 — New Module: Staff HR (Attendance + Leave + Enhanced Teacher)

### Teacher Model Enhancement (Modify Existing)
Add to `Teacher.ts`:
```ts
employeeCode: String (unique, sparse),
department: String,
designation: String,
reportingTo: ObjectId → Teacher (optional),
```

### New Model: `StaffAttendance`
```ts
// src/models/StaffAttendance.ts
{
  teacherId: ObjectId → Teacher (required),
  date: Date (required),
  status: enum ['Present','Absent','Late','Half Day','On Leave'],
  inTime: String,
  outTime: String,
  note: String,
  markedBy: ObjectId → User,
  createdAt, updatedAt
}
// Index: { teacherId, date } unique
```

### New Model: `Leave`
```ts
// src/models/Leave.ts
{
  applicantType: enum ['Staff','Student'],
  applicantId: ObjectId (required),  // Teacher._id or Student._id
  leaveType: enum ['Sick','Casual','Personal','Emergency','Maternity','Other'],
  fromDate: Date (required),
  toDate: Date (required),
  totalDays: Number,
  reason: String,
  status: enum ['Pending','Approved','Rejected','Cancelled'],
  approvedBy: ObjectId → User,
  approvalNote: String,
  appliedOn: Date,
  createdAt, updatedAt
}
```

### Routes
```
/admin/staff-attendance           ← Mark daily staff attendance (table per date)
/admin/staff-attendance/history   ← Staff attendance history with filters
/admin/leaves                     ← All leave requests (filter by type/status)
/admin/leaves/new                 ← Apply for leave
/admin/leaves/[id]                ← Leave detail + approve/reject actions
```

---

## Phase 3 — New Module: Payroll (Basic)

### New Model: `SalaryStructure`
```ts
// src/models/SalaryStructure.ts
{
  teacherId: ObjectId → Teacher (required, unique),
  basicSalary: Number,
  hra: Number,
  transport: Number,
  medicalAllowance: Number,
  otherAllowances: Number,
  providentFund: Number,
  professionalTax: Number,
  otherDeductions: Number,
  effectiveFrom: Date,
  createdAt, updatedAt
}
```

### New Model: `Payroll`
```ts
// src/models/Payroll.ts
{
  teacherId: ObjectId → Teacher (required),
  month: Number (1–12),
  year: Number,
  workingDays: Number,
  presentDays: Number,
  leaveDays: Number,
  basicSalary: Number,
  totalEarnings: Number,
  totalDeductions: Number,
  netSalary: Number,
  status: enum ['Draft','Processed','Paid'],
  paidOn: Date,
  paymentMode: enum ['Cash','Bank Transfer','Cheque'],
  remarks: String,
  createdAt, updatedAt
}
// Index: { teacherId, month, year } unique
```

### Routes
```
/admin/payroll                    ← Monthly payroll list (select month/year)
/admin/payroll/new                ← Generate monthly payroll run
/admin/payroll/[id]               ← Payroll detail
/admin/payroll/[id]/payslip       ← Printable payslip output
/admin/salary-structures          ← Salary structure per teacher
/admin/salary-structures/[id]/edit ← Edit structure
```

---

## Phase 4 — New Module: Library Manager

### New Model: `Book`
```ts
// src/models/Book.ts
{
  title: String (required),
  author: String,
  isbn: String (unique, sparse),
  publisher: String,
  edition: String,
  category: enum ['Textbook','Reference','Fiction','Non-Fiction','Magazine','Other'],
  department: String,
  totalCopies: Number (default 1),
  availableCopies: Number,
  shelfLocation: String,
  coverImage: String,
  language: String,
  publicationYear: Number,
  status: enum ['Available','Limited','Out of Stock'],
  createdAt, updatedAt
}
```

### New Model: `BookIssue`
```ts
// src/models/BookIssue.ts
{
  bookId: ObjectId → Book (required),
  borrowerType: enum ['Student','Staff'],
  borrowerId: ObjectId (required),   // Student._id or Teacher._id
  issueDate: Date (required),
  dueDate: Date (required),
  returnDate: Date,
  fine: Number (default 0),
  status: enum ['Issued','Returned','Overdue','Lost'],
  issuedBy: ObjectId → User,
  returnedTo: ObjectId → User,
  note: String,
  createdAt, updatedAt
}
```

### Routes
```
/admin/library                    ← Book catalog list
/admin/library/new                ← Add book
/admin/library/[id]               ← Book detail with issue history
/admin/library/[id]/edit          ← Edit book
/admin/library/issues             ← All active/overdue issues
/admin/library/issues/new         ← Issue a book
/admin/library/issues/[id]        ← Issue detail + return action
```

---

## Phase 5 — New Module: Inventory / Stock

### New Model: `InventoryItem`
```ts
// src/models/InventoryItem.ts
{
  name: String (required),
  code: String (unique, sparse),
  category: enum ['Stationery','Uniform','Textbook','Lab Equipment','Sports','Furniture','IT Equipment','Other'],
  unit: String ('pcs','kg','ltr','set'),
  currentStock: Number,
  minimumStock: Number,
  purchasePrice: Number,
  sellingPrice: Number,
  vendor: String,
  location: String,
  status: enum ['In Stock','Low Stock','Out of Stock'],
  createdAt, updatedAt
}
```

### New Model: `InventoryTransaction`
```ts
// src/models/InventoryTransaction.ts
{
  itemId: ObjectId → InventoryItem (required),
  transactionType: enum ['Stock In','Stock Out','Issue to Student','Return','Adjustment'],
  quantity: Number (required),
  referenceId: ObjectId (optional),   // Student._id if issued to student
  referenceType: String,
  note: String,
  date: Date,
  performedBy: ObjectId → User,
  createdAt, updatedAt
}
```

### Routes
```
/admin/inventory                  ← Items list with stock status
/admin/inventory/new              ← Add item
/admin/inventory/[id]             ← Item detail with transaction log
/admin/inventory/[id]/edit        ← Edit item
/admin/inventory/transactions     ← All stock transactions
/admin/inventory/transactions/new ← Record transaction (stock in/out/issue)
```

---

## Phase 6 — New Module: Transport Manager

### New Model: `TransportRoute`
```ts
// src/models/TransportRoute.ts
{
  routeName: String (required),
  routeCode: String (unique),
  vehicleNumber: String,
  driverName: String,
  driverPhone: String,
  attendantName: String,
  attendantPhone: String,
  startPoint: String,
  endPoint: String,
  stops: [{ stopName: String, pickupTime: String, dropTime: String }],
  monthlyFee: Number,
  capacity: Number,
  status: enum ['Active','Inactive','Under Maintenance'],
  createdAt, updatedAt
}
```

### New Model: `TransportAssignment`
```ts
// src/models/TransportAssignment.ts
{
  studentId: ObjectId → Student (required),
  routeId: ObjectId → TransportRoute (required),
  pickupStop: String,
  dropStop: String,
  direction: enum ['Both','Pickup Only','Drop Only'],
  effectiveFrom: Date,
  effectiveTo: Date,
  monthlyFee: Number,
  status: enum ['Active','Suspended','Ended'],
  createdAt, updatedAt
}
```

### Routes
```
/admin/transport                  ← Route list
/admin/transport/new              ← Add route
/admin/transport/[id]             ← Route detail with assigned students
/admin/transport/[id]/edit        ← Edit route
/admin/transport/assignments      ← All student transport assignments
/admin/transport/assignments/new  ← Assign student to route
```

---

## Phase 7 — New Module: Communication / Announcements

### New Model: `Announcement`
```ts
// src/models/Announcement.ts
{
  title: String (required),
  body: String (required),
  category: enum ['General','Academic','Fee','Exam','Holiday','Event','Emergency'],
  targetAudience: [String] (['All','Parents','Teachers','Students','Grade-1',...]),
  priority: enum ['Normal','Important','Urgent'],
  publishedAt: Date,
  expiresAt: Date,
  status: enum ['Draft','Published','Archived'],
  attachmentUrl: String,
  postedBy: ObjectId → User,
  createdAt, updatedAt
}
```

### Routes
```
/admin/communication              ← Announcement list
/admin/communication/new          ← Create announcement
/admin/communication/[id]         ← Announcement detail
/admin/communication/[id]/edit    ← Edit announcement
```

---

## Phase 8 — New Module: Health / Infirmary

### New Model: `HealthRecord`
```ts
// src/models/HealthRecord.ts
{
  studentId: ObjectId → Student (required),
  visitDate: Date (required),
  complaint: String,
  diagnosis: String,
  treatment: String,
  medicinesGiven: [{ name: String, dose: String, frequency: String }],
  referredTo: String,
  attendedBy: String,
  followUpDate: Date,
  note: String,
  createdAt, updatedAt
}
```

### Routes
```
/admin/health                     ← Visit log (all students, filterable)
/admin/health/new                 ← Log a visit
/admin/health/[id]                ← Visit detail
/admin/health/[id]/edit           ← Edit visit
/admin/students/[id]              ← (Enhance existing) Show health history tab
```

---

## Phase 9 — Enhancements to Existing Modules

### 9.1 Admissions Pipeline (Models Exist — Build UI)
- **Inquiry list page** — currently `AdmissionsClient.tsx` exists, verify its completeness
- **Application pipeline view** — kanban-style: Inquiry → Test Scheduled → Interview → Admitted → Rejected
- **Bulk actions** — approve multiple applications, export list
- **Convert approved application → Student record** (auto-create Student)

### 9.2 Fee Module Enhancements
- **Payment reversal** — add "Reverse" action on payment detail page, write audit note
- **Student fee ledger page** — `/admin/fees/ledger/[studentId]` — running balance table

### 9.3 Attendance Enhancements
- **Status enum expansion** — add `Late` and `Half Day` to attendance status field
- **Defaulter report** — filter students with attendance < threshold %

### 9.4 Teacher Profile Enhancements
- Add `employeeCode`, `department`, `designation` fields to Teacher create/edit form

### 9.5 Settings Enhancement
- **Grade Scales config** — add a grade scale section: A+ = 90–100, A = 80–89, etc.

---

## Phase 10 — User Management (Admin)

### Routes
```
/admin/users                      ← User list (admin/super_admin only)
/admin/users/new                  ← Create user account
/admin/users/[id]/edit            ← Edit user (reset password, change role)
```

### Actions
- Create user (hash password with bcrypt before saving)
- Update user (name, role, status, reset password)
- Delete user (soft delete — set status=Inactive)

---

## Navigation Additions (route-meta.ts)

New nav items to add in logical groups:

```
Group "People & Operations":
  - Timetable      /admin/timetable         (Grid3x3)
  - Staff HR       /admin/leaves            (UserCheck)
  - Staff Attendance /admin/staff-attendance (ClipboardList)
  - Payroll        /admin/payroll           (Banknote)
  
Group "Campus Operations":
  - Library        /admin/library           (BookMarked)
  - Inventory      /admin/inventory         (Package)
  - Transport      /admin/transport         (Bus)
  - Health         /admin/health            (Heart)
  
Group "Communication":
  - Announcements  /admin/communication     (Megaphone)
  
Group "System":
  - Users          /admin/users             (ShieldCheck)
```

---

## Seed Data Strategy

All new modules will be seeded in `scripts/seed.ts` (extend existing script).

| Module | Seed Volume |
|---|---|
| Users | 7 accounts (1 super_admin, 1 admin, 1 accountant, 2 teachers linked, 2 parents linked) |
| Timetable | Full week for 3 classes (Grade 1A, Grade 5A, Grade 10A) |
| Staff Attendance | 30 days for all teachers |
| Leaves | 10 leave records (mix of approved/pending/rejected) |
| Salary Structures | All teachers |
| Payroll | 2 months of payroll for all teachers |
| Library Books | 30 books, 5 active issues |
| Inventory Items | 20 items, 15 transactions |
| Transport Routes | 3 routes with stops, 15 student assignments |
| Announcements | 8 announcements (mix of categories and status) |
| Health Records | 15 student visit records |

---

## Technical Decisions

| Decision | Choice | Reason |
|---|---|---|
| Auth library | `next-auth` v4 with CredentialsProvider | Existing Next.js 14 ecosystem, simple JWT session |
| Password hashing | `bcryptjs` | Pure JS, no native build issue on Windows |
| Test login | Quick-fill buttons on login page (only in dev mode `NODE_ENV !== 'production'`) | Easy internal testing without separate dev tool |
| Session storage | JWT (default next-auth) | No extra DB call on each request |
| Middleware | `src/middleware.ts` with `withAuth` matcher | Standard Next.js pattern |
| New DB models | Follow existing `mongoose.models.X || mongoose.model()` singleton pattern | Prevent HMR issues in Next.js |
| Timetable conflict check | API route or server action that queries for overlaps before save | Keep it simple, no external scheduler |

---

## Packages to Install

```bash
npm install next-auth bcryptjs
npm install -D @types/bcryptjs
```

No other new packages required — all UI components already exist in the codebase.

---

## Verification Plan

After each phase:
1. `npm run build` must pass with 0 TypeScript errors
2. Manually test CRUD flow: Create → View list → Open detail → Edit → Delete
3. Verify nav link appears in sidebar and breadcrumb works
4. Verify seed data appears correctly after `npm run seed`
5. After Phase 0: Test each quick-login button, verify protected routes redirect to `/login`
