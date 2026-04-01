# Admissions Application Workflow

## Purpose
- Extend the admissions desk beyond first-contact lead handling.
- Give the school office a structured record for families who are actively progressing toward enrollment.
- Create the operational bridge between a public inquiry and a future student record.

## What This Module Owns
- Starting an application directly from an admissions inquiry.
- Generating a school-facing application number.
- Carrying inquiry data into an editable application profile.
- Managing:
  - `academicYear`
  - `application status`
  - `review date`
  - `application notes`
  - `counselor notes`
  - `document checklist`
- Keeping inquiry status synchronized with application progress.

## Routes
- `/admin/admissions`
  - lead desk and inquiry review
- `/admin/admissions/[id]`
  - inquiry detail and conversion trigger
- `/admin/admissions/applications`
  - application register
- `/admin/admissions/applications/[id]`
  - full application workflow detail

## Data Model
- `AdmissionApplication`
  - `inquiry`
  - `applicationNumber`
  - `academicYear`
  - `status`
  - `parentName`
  - `studentName`
  - `studentGradeInterest`
  - `email`
  - `phone`
  - `applicationNotes`
  - `counselorNotes`
  - `reviewDate`
  - `documentChecklist`
  - `createdAt` / `updatedAt`

## Current Status Model
- `Draft`
- `Documents Pending`
- `Review Scheduled`
- `Ready for Enrollment`
- `Closed`

## Current Checklist Scope
- Birth certificate / age proof
- Parent ID and address proof
- Previous academic records
- Transfer certificate, if applicable
- Student photographs

## Operational Value for the School
- The office can separate casual leads from serious applicants.
- Counselors can track missing documents without relying on email threads alone.
- The owner gets visibility into the actual admissions pipeline, not just top-of-funnel inquiries.
- This prepares the product for the next step: controlled conversion into student enrollment.

## Intentional Limits
- No file uploads yet.
- No parent-facing application tracker yet.
- No interview scheduling engine yet.
- No student record creation yet.
- No admission fee posting yet.

## Recommended Next Steps
- Add secure document uploads and per-item verification evidence.
  - Planning baseline: `docs/admissions-document-verification-plan.md`
- Add counselor assignment and interview / assessment scheduling.
- Add an enrollment conversion step that creates a student record only when mandatory fields are complete.
- Add notification rules for follow-up, visit reminders, and document pending alerts.
