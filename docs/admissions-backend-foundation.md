# Admissions Backend Foundation

## Purpose
- Convert the public admissions and campus visit UI into real backend-backed intake.
- Give the school office a dedicated admissions desk inside admin for handling incoming interest before full enrollment workflows are built.
- Establish the first backend bridge between the public website and internal school operations.

## Scope Implemented
- Public admissions inquiry form now persists records to MongoDB.
- Public campus visit request form now persists records to MongoDB.
- Admin admissions console at `/admin/admissions`.
- Admissions detail workflow page at `/admin/admissions/[id]`.
- Admissions application register at `/admin/admissions/applications`.
- Application detail workflow page at `/admin/admissions/applications/[id]`.
- Status progression for leads:
  - `New`
  - `Contacted`
  - `Visit Requested`
  - `Visit Scheduled`
  - `Application Started`
  - `Closed`
- Internal notes, preferred visit details, and follow-up date management.
- Inquiry-to-application conversion with document checklist and review date management.
- Seed data for admissions records so the module is testable immediately after seeding.

## Data Model
- `AdmissionInquiry`
  - `parentName`
  - `studentName`
  - `studentGradeInterest`
  - `email`
  - `phone`
  - `message`
  - `requestType`
  - `status`
  - `sourcePage`
  - `sourcePath`
  - `preferredVisitDate`
  - `preferredVisitTime`
  - `followUpDate`
  - `internalNotes`
  - `lastContactedAt`
  - `createdAt` / `updatedAt`

## Workflow Ownership
- `Public site`
  - Captures lead intent and routes it into backend storage.
  - Presents success/error feedback after submission.
- `Admissions desk`
  - Reviews submissions.
  - Filters by type and status.
  - Opens a detailed workflow record.
  - Updates follow-up and visit planning context.
- `Application workflow`
  - Creates a formal admissions application from an inquiry.
  - Tracks academic year, family profile updates, counselor notes, and checklist readiness.
  - Keeps inquiry and application status aligned for the office team.
- `Dashboard integration`
  - Admissions review is available as an admin quick action.

## Still Out of Scope
- Secure document upload and file storage.
- Admission-to-student conversion wizard.
- Payment of admission fees.
- Automated email, WhatsApp, or SMS follow-ups.
- Campus visit slot booking with calendar conflict management.
- Parent self-service application tracking.

## Next Logical Extensions
- Document upload and verification evidence.
- Interview / assessment scheduling.
- Inquiry-to-enrollment conversion into student records.
- Notification rules and counselor assignment.
- Admission fee collection and receipt linkage.
