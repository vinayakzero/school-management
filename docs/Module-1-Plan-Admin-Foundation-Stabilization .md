# Module 1 Plan: Admin Foundation Stabilization

## Summary
- Build the first execution module as an `admin-first, role-ready` foundation pass for the current product.
- Scope is the core admin surfaces: `Dashboard`, `Students`, `Fees`, `Attendance`, `Exams`, and `Calendar`, plus the shared admin shell and the core print entry points tied to those modules.
- Target outcome is `production-ready workflows`: no broken core routes, consistent UI patterns, usable build/lint workflow, standardized forms/tables/headers, and stable desktop-first behavior with mobile-safe fallbacks.
- Out of scope for this module: auth implementation, parent/teacher portals, admissions module, public landing page redesign, and breaking schema changes.

## Implementation Changes
## 1. Shared UI and Design Foundation
- Introduce a real reusable `shadcn/ui`-style component layer for admin primitives instead of continuing page-by-page custom Tailwind markup.
- Define one visual system for the admin app: institutional-premium tone, stable spacing scale, type hierarchy, status colors, form states, table density, and print-safe neutral surfaces.
- Standardize a single admin page contract: `page header`, `breadcrumbs`, `primary action`, `secondary actions`, `summary cards`, `filter bar`, `table/list body`, `empty state`, and `destructive confirmation`.
- Unify typography so the root font stack and CSS tokens do not conflict.
- Keep current dark-compatible styling support, but do not add a new theme-toggle feature in this module.

## 2. Admin Shell and Navigation
- Replace the current static-feeling admin shell with a route-aware shell that correctly highlights the active section and shows consistent page context.
- Standardize sidebar, top bar, content width, page padding, and overflow behavior for desktop-first usage.
- Normalize navigation labels and route affordances across the six core surfaces.
- Ensure every core flow is reachable through explicit route entry points, not hidden behind one-off buttons or modal-only interactions.

## 3. Workflow Completion by Core Surface
- `Dashboard`: align cards, quick actions, recent records, and navigation shortcuts with the shared shell and route standards.
- `Students`: standardize list, create, edit, detail, lifecycle operations, results, and documents entry flow; preserve current lifecycle operations and document hub behavior.
- `Fees`: standardize student fee report, fee structures, payment recording, recent payments, receipt entry points, and daily collection access.
- `Attendance`: standardize attendance entry, history, reports, and register print access; keep holiday-aware blocking and class/date navigation intact.
- `Exams`: add the missing edit workflow at `/admin/exams/[id]/edit`, standardize list/create/edit/marks/timetable flow, and remove any broken route references.
- `Calendar`: convert add/edit event workflow from modal-led interaction to dedicated route pages while preserving list/calendar views and holiday behavior used by attendance.

## 4. Print and Output Standardization
- Keep print pages in scope only where they are core workflow endpoints: fee receipt, exam timetable, attendance register, and student document entry points.
- Standardize print entry UX from parent admin screens so print routes feel intentional and first-class.
- Improve consistency of print headers, metadata blocks, and back-navigation, but do not do a full redesign of every template in this module.

## 5. Repo Hygiene and Verification Foundations
- Make `lint` runnable non-interactively by completing Next.js ESLint setup and checking it into the repo.
- Resolve setup/doc mismatches so environment variable documentation matches runtime reality.
- Keep Mongo-backed models and seed data backward compatible; no destructive schema reshaping in this phase.
- Preserve existing server-action architecture and refactor only where needed to support route-based workflows and reusable view patterns.

## Public Interfaces, Routes, and Type Conventions
- Add dedicated route interfaces for `Calendar create/edit` and `Exam edit`; core admin create/edit flows must be route-based, not modal-only.
- Establish a shared internal UI contract for page headers, filters, table actions, form feedback, status badges, and print metadata blocks.
- Do not introduce external API changes or breaking database shape changes in this module.
- Any new types should be extracted around reusable admin view state, not around domain-model rewrites.

## Acceptance Criteria
- All six core admin surfaces use the shared shell and common page structure.
- No broken links remain in the core admin flow.
- Calendar add/edit is route-based.
- Exam edit route exists and is wired from the exam list.
- Core print entry points are consistent and reachable from their parent workflows.
- `npm run build` and `npm run lint` run without interactive prompts.
- Existing Mongo data and seeded demo records continue to work without migration requirements.

## Test Plan
- Build and static verification: `build`, `lint`, and type validation pass in a clean non-interactive run.
- Navigation smoke tests: open each of the six core surfaces from the admin shell and verify active nav state, breadcrumbs, and primary actions.
- Student flow: create, edit, open profile, run lifecycle operation, open results, open documents.
- Fees flow: create/edit fee structure, record payment, open generated receipt, verify student fee summary refresh.
- Attendance flow: load class roster by grade/section/date, record attendance, confirm holiday blocking, open history, open reports, open register print.
- Exams flow: create exam, edit exam, open marks entry, delete exam safely, open timetable print page.
- Calendar flow: create event, edit event, delete event, verify holiday events still affect attendance behavior.
- Responsive checks: verify desktop-first layout at large widths and acceptable behavior for tablet/mobile on filters, tables, and form pages.

## Assumptions and Defaults
- Visual direction is `institutional premium`, not dense-console and not parent-facing soft.
- Device strategy is `desktop-first, mobile-safe`.
- Surface scope is `admin-only` for this module; the public home page is deferred.
- Auth is deferred; this module only prepares the app structure for later role-based access.
- Print coverage is limited to core workflow print routes, not a full print-template redesign.
- Backward compatibility with current collections and seed data is required.

## Ordered Delivery Sequence
1. Shared UI layer and design tokens.
2. Route-aware admin shell and navigation cleanup.
3. Dashboard standardization.
4. Students workflow pass.
5. Fees workflow pass.
6. Attendance workflow pass.
7. Exams workflow pass, including edit route.
8. Calendar route conversion and workflow pass.
9. Core print entry-point standardization.
10. Lint/docs/setup cleanup and final regression pass.

## Next Module Candidates After Foundation
- Admissions and enrollment workflow.
- Finance maturity: ledgers, reversals, notices, audit trail.
- Communication and notifications.
- Auth and roles as the gateway to teacher/parent portals.
