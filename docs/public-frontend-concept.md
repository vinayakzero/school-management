# Public Frontend Concept: Institutional School Website

## Design Intent
- Build a public-facing school website that feels aesthetic, stable, and command-driven rather than soft, generic, or brochure-like.
- Use a `modern institutional` tone: strong editorial layouts, large photography, serif-led headings, disciplined spacing, and clear conversion paths.
- Keep the experience `activity-led` and `knowledge-led` at the same time. Academic seriousness and student life should appear together, not as competing narratives.
- Maintain a `hybrid swap-ready` asset strategy. Placeholder photography is used now, but every major media region is mapped for replacement with real school imagery later.

## Brand Concept
- Working identity: `Meridian Heights School`
- Role of the placeholder identity:
  - Gives the frontend a coherent institutional voice during design.
  - Can be replaced later with the real school name, address, metrics, and admissions language.
- Visual direction:
  - Warm neutral backgrounds with deep navy structure and amber accents.
  - `Cormorant Garamond` for editorial headings and `Manrope` for body/interface clarity.
  - Rounded but weighty surfaces. The geometry is premium without becoming playful.

## Information Architecture
- `/`
  - Hero with full-bleed photograph and left-caption panel.
  - Institutional proof band.
  - Academic promise.
  - Student life preview.
  - Photographic gallery strip.
  - Admissions CTA.
- `/about`
  - Philosophy and school identity.
  - Leadership positioning.
  - Values grid.
  - Milestones.
  - Visual culture strip.
- `/academics`
  - Curriculum and learning stages.
  - Academic stats band.
  - Faculty and mentorship.
  - Labs, library, and knowledge spaces.
  - Admissions handoff CTA.
- `/admissions`
  - Process steps.
  - Entry bands.
  - Documents checklist.
  - FAQ.
  - Inquiry and campus visit UI preview.
- `/student-life`
  - Clubs, arts, sport, leadership.
  - Wellbeing and support.
  - Motion-led image gallery.
  - Admissions and visit CTA.
- `/campus`
  - Facilities overview.
  - Learning infrastructure.
  - Safety and transport framing.
  - Contact and map placeholder.
  - Campus visit form preview.

## Motion Principles
- Framer Motion is used to make the frontend feel alive without losing institutional restraint.
- Hero motion:
  - Slow image drift and scale.
  - Subtle ambient light orbs.
  - Caption panel reveal from the left.
- Section motion:
  - Fade-up reveals on scroll.
  - Card cascades with short stagger delays.
  - Premium hover lift for editorial cards.
- Utility motion:
  - Mobile navigation reveal.
  - Gallery marquee on key visual bands.
  - Page transition wrapper across public routes.
- Accessibility:
  - `prefers-reduced-motion` disables or simplifies non-essential animation.

## Asset Replacement Checklist
- `home-hero`
  - Replace with a real campus-wide activity image.
  - Keep empty space on the left for caption overlay.
- `about-culture`
  - Replace with a classroom, seminar, or assembly image.
- `academics-hero`
  - Replace with a real academic environment image.
- `library`
  - Replace with the actual school library.
- `science-lab`
  - Replace with a real STEM or innovation lab.
- `student-life-hero`
  - Replace with sports, club, or leadership activity imagery.
- `arts-culture`
  - Replace with music, theatre, or visual arts scenes.
- `admissions-conversation`
  - Replace with reception, admissions counselling, or campus-visit photography.
- `wellbeing`
  - Replace with a real pastoral or mentoring scene.
- `campus-hero`
  - Replace with the school facade, quad, or defining architecture.

## Copy and Tone Rules
- Write with confidence, not hype.
- Prefer concise paragraphs over long institutional statements.
- Avoid startup language, exaggerated promises, and futuristic buzzwords.
- Keep the school voice scholarly, modern, and parent-readable.
- Every page should end with a clear next step: academics, admissions, or campus visit.

## Backend Status
- Implemented now:
  - Admissions inquiry persistence.
  - Campus visit request persistence.
  - Admin admissions desk ingestion path.
  - Admin application workflow created from inquiries.
- Still deferred:
  - Campus visit slot scheduling and automated confirmations.
  - Contact form routing and notification delivery.
  - Dynamic academic content blocks from CMS or admin-managed collections.
  - Public media gallery management.
  - Search-friendly structured data and richer SEO metadata.

## Implementation Notes
- Public frontend lives in `src/app/(public)`.
- Shared public components live in `src/components/public`.
- Typed public config lives in `src/lib/public-site.ts`.
- Public routes remain structurally separate from admin operations.
