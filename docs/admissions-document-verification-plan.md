# Admissions Document Verification Plan

## Purpose
- Define the next admissions backend layer after inquiry and application creation.
- Give the school office a clear checklist for which documents are required, who verifies them, and when an application is ready to move forward.
- Maintain one comparison-ready planning reference so future implementation can be measured against a known target state.

## Why This Module Matters
- Admissions gets delayed when documents live across WhatsApp, email, paper copies, and office desks.
- The school needs one structured view of:
  - what has been submitted,
  - what is still pending,
  - what has been verified,
  - and what is blocking enrollment.
- This module is the control point before student creation, admission fee collection, and final enrollment confirmation.

## Current State vs Target State
| Area | Current State | Target State |
| --- | --- | --- |
| Inquiry capture | Implemented | Stable |
| Application record | Implemented | Stable |
| Document checklist labels | Implemented | Expandable and rule-driven |
| File upload | Not implemented | Secure upload per checklist item |
| Verification evidence | Not implemented | Reviewer, date, note, and file history |
| Rejection / resubmission loop | Not implemented | Explicit review and resubmission cycle |
| Enrollment readiness gate | Partial via notes/status | Hard validation before conversion to student |
| Parent-facing tracking | Not implemented | Deferred |

## Planned Ownership
- `Admissions desk`
  - marks required documents
  - receives and reviews submissions
  - flags missing or rejected items
- `Counselor / registrar`
  - verifies academic and identity documents
  - leaves formal review notes
  - clears the application for enrollment
- `System`
  - stores file metadata
  - tracks status history
  - blocks enrollment conversion until required conditions are met

## Status Model
### Per-document status
- `Pending`
- `Uploaded`
- `Under Review`
- `Verified`
- `Rejected`
- `Waived`

### Application document readiness
- `Not Started`
- `In Progress`
- `Pending Review`
- `Verified with Exceptions`
- `Ready for Enrollment`

## Recommended Checklist Structure
### Core documents for most applications
- Birth certificate or age proof
- Parent ID proof
- Parent address proof
- Student photographs
- Previous academic records

### Conditional documents
- Transfer certificate
- Previous school leaving certificate
- Medical declaration
- Category certificate, if applicable
- Transport request form, if transport is needed

### Internal school-side documents
- Counselor review note
- Principal approval note, if required
- Admission decision note
- Enrollment readiness confirmation

## Checklist Rules
- Every checklist item should define:
  - `key`
  - `label`
  - `required`
  - `applicable grades`
  - `allowed file types`
  - `max file count`
  - `current status`
  - `review note`
  - `reviewedBy`
  - `reviewedAt`
- Items marked `required` must block enrollment conversion until they are either `Verified` or `Waived`.
- `Waived` must require a reviewer note.
- `Rejected` must require a rejection reason.

## Workflow
1. Inquiry is converted into an application.
2. System creates the default document checklist.
3. Admissions desk confirms which items are required for that student and grade.
4. Family documents are received by upload or manual office intake.
5. Each item moves from `Pending` to `Uploaded`.
6. Reviewer checks the file and moves it to:
   - `Verified`
   - `Rejected`
   - `Waived`
7. If rejected, the application remains blocked and the item returns to resubmission.
8. When all required items are `Verified` or `Waived`, the application becomes eligible for enrollment conversion.

## Comparison Flow for Future Builds
### Phase 1: Checklist-backed verification
- Goal:
  - support file uploads, review notes, and document-level status
- Success signal:
  - office can see exactly which documents are blocking the application

### Phase 2: Enrollment gate
- Goal:
  - prevent student creation until document conditions are met
- Success signal:
  - application can only convert when required items are cleared

### Phase 3: Review automation
- Goal:
  - reminders, rejection notices, pending review alerts
- Success signal:
  - office follow-up no longer depends on manual memory

## Implementation Checklist
- [x] Inquiry workflow exists
- [x] Application workflow exists
- [x] Static checklist entries exist
- [ ] Checklist items support uploaded file metadata
- [ ] Checklist items support reviewer and review timestamp
- [ ] Rejected items support formal rejection reason
- [ ] Applications show document readiness summary
- [ ] Enrollment conversion checks document readiness
- [ ] Audit trail exists for document actions
- [ ] Notifications exist for pending and rejected documents

## Proposed Data Additions
### `AdmissionDocument`
- `application`
- `checklistKey`
- `label`
- `status`
- `required`
- `files`
- `reviewNote`
- `reviewedBy`
- `reviewedAt`
- `rejectionReason`
- `createdAt`
- `updatedAt`

### `AdmissionDocumentFile`
- `storageKey`
- `fileName`
- `mimeType`
- `size`
- `uploadedAt`
- `uploadedBy`

## Proposed Admin Surfaces
- `/admin/admissions/applications/[id]`
  - expand current checklist into reviewable upload rows
- `/admin/admissions/applications/[id]/documents`
  - optional dedicated document review page if the inline model becomes too dense

## Blocking Rules for Future Enrollment Conversion
- Application status cannot move to `Ready for Enrollment` unless:
  - required documents are `Verified` or `Waived`
  - counselor notes are present
  - review date has been completed or cleared
- Student record creation must fail with an actionable message if any blocking document remains unresolved.

## Scope for the Next Build
- In scope:
  - backend model for document records
  - upload-ready checklist structure
  - per-item verification status
  - reviewer notes and timestamps
  - readiness summary on application detail
- Out of scope:
  - parent portal
  - automated email or WhatsApp delivery
  - OCR or AI document extraction
  - admission payment workflows

## Recommended Build Order
1. Add document model and file metadata structure.
2. Extend application detail page with upload and review controls.
3. Add readiness summary and blocking validation.
4. Add enrollment conversion gate.
5. Add reminders and notifications.

## Reference Use
- Use this document as:
  - the planning baseline before implementation,
  - the comparison sheet during build reviews,
  - and the progress tracker for later admissions modules.
