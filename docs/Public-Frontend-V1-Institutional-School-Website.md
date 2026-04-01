# Public Frontend V1: Institutional School Website

## Summary
- Build a dedicated public-facing frontend in `src/app/(public)` with a shared institutional layout, leaving the admin product untouched.
- Create six primary pages: `/`, `/about`, `/academics`, `/admissions`, `/student-life`, and `/campus`.
- Establish a visual concept that is `modern institutional`: aesthetic, strong, stable, activity-led, knowledge-led, and future-aware without feeling speculative or corporate.
- Use `framer-motion` for measured cinematic motion: strong hero transitions, ambient depth, staggered section reveals, and premium micro-interactions with `prefers-reduced-motion` fallbacks.
- Add a separate planning/concept document at `docs/public-frontend-concept.md` covering design intent, IA, asset map, motion rules, and future backend hooks.

## Key Changes
- Public shell:
  - Add a transparent-on-hero, solid-on-scroll header with an admissions-first primary CTA.
  - Add a strong footer with school identity, quick links, contact basics, and inquiry entry points.
  - Create a reusable public component set in `src/components/public` for hero panels, section headers, narrative grids, image-led split sections, stat bands, CTA ribbons, gallery strips, and structured content cards.
- Design system:
  - Keep the admin UI system intact, but define a distinct public visual language using existing Tailwind/shadcn foundations.
  - Use a restrained palette, serif-plus-sans typography pairing, editorial spacing, and large photographic compositions.
  - Follow a hybrid swap-ready asset model: curated placeholder imagery now, with a documented replacement map for real school photography later.
- Motion architecture:
  - Install and integrate `framer-motion`.
  - Define shared motion presets for hero caption reveal, image parallax drift, section fade-up stagger, stat counter reveal, card hover lift, marquee/gallery motion, and page transitions.
  - Avoid excessive looping effects; motion should reinforce prestige and direction, not feel startup-like.
  - Respect reduced-motion settings and keep animations performance-safe around hero media and mobile scroll.
- Page set and section structure:
  - Home:
    - Full-bleed photo-led hero with a left-caption content block inspired by the DAIS-style composition.
    - Quick institutional facts, academic pillars, student life highlights, campus preview, admissions pathway, principal/leadership note, and a closing inquiry CTA.
  - About:
    - School philosophy, institutional identity, leadership message, values, milestones, and a visual culture section.
  - Academics:
    - Curriculum overview, stage-wise learning model, faculty/mentorship positioning, labs/library/learning environments, and outcomes-focused academic storytelling.
  - Admissions:
    - Clear process timeline, eligibility/entry bands, documents checklist, FAQs, and inquiry/visit CTA zones.
    - Forms in this module are UI-only or non-persistent placeholders; backend integration is deferred.
  - Student Life:
    - Clubs, sports, arts, events, leadership opportunities, wellbeing/support, and a gallery-led activity narrative.
  - Campus:
    - Facilities, classrooms, labs, library, safety, transport, and visit-oriented campus storytelling, with contact details and map/visit CTA integrated here and in the footer.
- Content and interface contracts:
  - Add typed config for public navigation, page hero metadata, CTA definitions, and image asset slots so copy/media can be swapped without layout rewrites.
  - Use route-level page metadata and a consistent section contract for heading, body copy, media, and CTA placement.
  - Keep all content school-representative and institutional; exclude alumni, careers, and speculative “future” pages from navigation and page builds.
- Documentation deliverable:
  - `docs/public-frontend-concept.md` should include the brand concept, visual principles, page-by-page purpose, section map, motion principles, asset replacement checklist, copy tone guidelines, and deferred backend hooks for inquiry/visit forms.

## Public Interfaces, Routes, and Types
- Routes:
  - `/`
  - `/about`
  - `/academics`
  - `/admissions`
  - `/student-life`
  - `/campus`
- Shared public interfaces:
  - `PublicNavItem`
  - `PublicHeroMedia`
  - `PublicSectionBlock`
  - `PublicCta`
  - `MotionPresetKey`
  - `ImageAssetSlot`
- Shared behaviors:
  - Admissions CTA appears in header, hero, and footer.
  - Contact/visit information lives primarily on `/campus`, with lightweight footer duplication.
  - Public forms do not require backend persistence in this phase.

## Test Plan
- Route and layout checks:
  - All six public routes render with the shared header/footer and correct active navigation state.
  - Admin routes remain visually and structurally unaffected.
- Design and responsive checks:
  - Hero composition holds on desktop, tablet, and mobile without breaking the left-caption hierarchy.
  - Large image sections, card grids, and CTA bands remain balanced across breakpoints.
- Motion checks:
  - Hero motion, section reveals, and hover states feel premium and restrained.
  - Reduced-motion mode disables or simplifies all non-essential animations.
  - No major layout shift or jank from image/motion interplay.
- Content and CTA checks:
  - Admissions-first CTAs are consistent and present across the intended pages.
  - Campus/contact information is accessible from footer and `/campus`.
  - Placeholder inquiry/visit interactions are clearly non-backend and do not imply saved submissions.
- Build verification:
  - `npm run lint` and `npm run build` pass after adding Framer Motion and the new public route structure.

## Assumptions and Defaults
- Tone is locked to `modern institutional`, not luxury-school branding and not soft community-first branding.
- Visual strategy is `hybrid swap-ready`: implement with curated placeholder imagery now and document real-photo replacement points.
- CTA strategy is `admissions first`.
- The sixth primary page is `Campus & Facilities`.
- Backend work is deferred; inquiry/visit forms are frontend-only shells in this module.
- No alumni, careers, awards, or speculative “future initiatives” pages are included in V1 navigation.
