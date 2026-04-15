# School ERP Execution and Progress Plan

## Summary
- Use [implementation_plan.md](/F:/GIT/school-management/docs/implementation_plan.md) as the execution backbone and [School-ERP-Plan.md](/F:/GIT/school-management/docs/School-ERP-Plan.md) as the feature reference list.
- Treat the current repo as already beyond “planning only”: auth/login, users, admissions foundation, timetable, staff attendance, and leaves are present, but the app is not yet stable enough to advance cleanly.
- Start with a stabilization phase before any new ERP module expansion. Current proof: `next build` compiles app code but fails in the new leave detail flow with a type error in `src/app/admin/leaves/[id]/page.tsx`.
- Keep tracking lightweight for now: phase-by-phase status only. Defer detailed feature telemetry or in-app tracking until the current in-flight modules are stable.

## Current Status Snapshot
- Stable or broadly established:
  - Students, teachers, classes, subjects, courses, syllabus, exams, student attendance, calendar, fees, templates, admissions foundation.
- Implemented but needs stabilization:
  - Phase 0 auth stack: `next-auth`, login page, middleware, seeded users, `/admin/users`.
  - Phase 1 timetable: model, routes, nav, seed data.
  - Phase 2 HR subset: `StaffAttendance`, `Leave`, routes, nav, seed data.
- Not started or not yet visible in code:
  - Payroll, library, inventory, transport, communication, health/infirmary.
  - Late-phase enhancements from the plan: advanced admissions pipeline, fee ledger/reversal, attendance defaulter reporting, settings grade-scale configuration.
- Repo risk to account for:
  - The worktree is already dirty with unrelated public/frontend and admin changes. ERP execution should not proceed mixed into that state; isolate or reconcile it first.

## Execution Plan
### 1. Baseline and stabilization first
- Freeze scope to “make current in-flight ERP work green” before adding any new module.
- Resolve all existing type/build failures, starting with the leave module type mismatch and then rerun full build until green.
- Audit the newly added auth/users/timetable/staff-attendance/leaves flows for pattern consistency with the established admin module convention in the repo.
- Verify seed data still works end-to-end after stabilization and that seeded records match the new modules already introduced.

### 2. Finish the partially built phases before expanding
- Phase 0: harden auth and users.
  - Confirm login, logout, middleware protection, role gating, quick-login dev flow, and seeded account usability.
  - Finish user CRUD semantics including status changes and password reset flow.
- Phase 1: finish timetable.
  - Ensure class-wise grid view, create/edit flow, and conflict detection behave consistently.
  - Make timetable printable only after the CRUD and conflict path are stable.
- Phase 2: finish staff attendance and leaves.
  - Complete daily mark/register flow, history reporting, leave apply/review/detail flow, and any missing teacher model fields needed by these modules.
  - Treat this phase as done only when the leave detail/type flow is fully corrected and all HR screens render without TS or runtime issues.
- Existing admissions foundation:
  - Keep admissions in the stabilization lane because it is already live in the repo and connected to admin workflows.
  - Verify inquiry/application detail, workflow transitions, and admin pipeline actions before moving to later phases.

### 3. Expand into remaining ERP phases only after stabilization
- Implement the remaining modules in this order:
  1. Payroll
  2. Library
  3. Inventory
  4. Transport
  5. Communication / announcements
  6. Health / infirmary
  7. Late enhancements to admissions, fees, attendance, teacher profile, and settings
- For every new module, follow the existing repo pattern exactly:
  - model
  - admin route group
  - server actions
  - client list/form/detail pages
  - nav registration
  - model pre-registration
  - seed extension
- Do not parallelize unrelated modules until one full module is green, seeded, and navigable.

## Tracking Approach
- Use simple phase tracking now, not tight feature telemetry.
- Add one repo-tracked execution ledger after stabilization begins, using a single status vocabulary:
  - `Not Started`
  - `In Progress`
  - `Stabilizing`
  - `Done`
  - `Blocked`
- Track progress by module and by phase, not by subjective percentages.
  - Progress measure should be `completed modules / planned modules` plus current phase status.
- Update tracking only at these moments:
  - phase start
  - phase completion
  - when a module becomes blocked
  - when acceptance tests pass for a module
- Defer detailed sub-feature tracking until the first stabilization milestone is complete. At that point, expand into a more granular tracker if the project velocity justifies it.

## Important Changes / Internal Interfaces
- No new external API contract is needed for planning.
- Internal execution rules to lock in:
  - build must be green before a new ERP phase starts
  - every module must be seed-backed before it is marked done
  - every module must be registered in admin nav and Mongo pre-registration before it is considered complete
  - tracking status is phase/module based only for now
- Source-of-truth docs:
  - [implementation_plan.md](/F:/GIT/school-management/docs/implementation_plan.md) becomes the ordered delivery plan
  - [School-ERP-Plan.md](/F:/GIT/school-management/docs/School-ERP-Plan.md) remains the feature reference checklist
  - add one execution tracker doc later only when stabilization work begins

## Test Plan
- Baseline checks for every phase:
  - `npm run build`
  - `npm run seed`
  - open admin nav and confirm route visibility
- Auth/users:
  - login with each seeded role
  - protected-route redirect behavior
  - user create/edit/status update/reset-password flow
- Timetable:
  - create, edit, class-wise view, conflict detection, print path
- Staff attendance:
  - mark daily attendance, reload same day, verify history filters
- Leaves:
  - create leave, open detail, approve/reject, list refresh, no type/runtime failures
- Admissions:
  - public submission persists
  - admin inquiry list/detail/application flow reflects saved records
- Later modules:
  - each module must pass create → list → detail → edit → status/action flow before being marked done

## Assumptions and Defaults
- Execution bias is “stabilize current modules first.”
- Tight tracking is intentionally deferred; only lightweight phase tracking should be introduced at first.
- Public/frontend work currently in the dirty tree is not part of this ERP execution plan and should not be mixed into the stabilization branch.
- No new ERP phase should begin until the current build is green and the in-flight modules above are no longer blocked.
