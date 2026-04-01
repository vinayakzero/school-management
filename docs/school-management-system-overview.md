# School Management System Overview

## Purpose
- Run the school as one connected operating system instead of scattered spreadsheets, manual registers, and disconnected office processes.
- Give the school owner and office team a single place to manage academic operations, finance, attendance, exams, records, templates, and public-facing admission intake.
- Keep the product structured around real school workflows: student lifecycle, timetable-driven operations, fee collection, academic records, and admissions follow-up.

## Current Product Structure
- `Public frontend`
  - Institutional website for school presentation, academics, admissions storytelling, student life, and campus visits.
  - Public inquiry and campus visit requests now save into the backend admissions desk.
- `Admin operations`
  - Dashboard, students, teachers, classes, subjects, courses, syllabus, exams, attendance, calendar, fees, templates, settings.
  - Admissions now includes both the inquiry desk and the application workflow layer.
- `Data layer`
  - Next.js App Router with MongoDB via Mongoose models.
  - Server actions handle most write workflows.
  - Route-based admin pages are the primary operator surface.

## Scope Boundaries
- In scope today:
  - School office operations.
  - Academic and finance workflows.
  - Public admissions intake and campus visit request capture.
  - Admin-side review, status progression, and application-stage handling for incoming leads.
- Deferred but planned:
  - Parent and teacher portals.
  - Authentication and role-based access.
  - Transport, library, HR/payroll, and communication modules.
  - Automation around visit scheduling, notifications, and lead routing.
  - Enrollment conversion, document upload, and interview scheduling.

## Backend Module Sequence
- `Module 1 completed`
  - Admin foundation stabilization.
- `Public frontend completed`
  - Institutional website shell and page system.
- `Current backend module`
  - Admissions application workflow:
    - public inquiry persistence
    - campus visit request persistence
    - admin admissions desk
    - workflow status, follow-up, and notes
    - inquiry-to-application conversion
    - application register and document checklist
- `Likely next backend modules`
  - Enrollment conversion and student record creation
  - Admission document uploads and verification evidence
  - Interview / assessment scheduling
  - Finance maturity and ledger-level controls
  - Communication and notification systems
  - Auth and role-aware portals

## Active Planning References
- `docs/admissions-application-workflow.md`
  - current inquiry-to-application module
- `docs/admissions-document-verification-plan.md`
  - next admissions checklist, review, and verification module

## Operating Principle
- Every module should describe:
  - why it exists for the school,
  - which workflows it owns,
  - which data entities it introduces,
  - and what remains intentionally out of scope for the next phase.
