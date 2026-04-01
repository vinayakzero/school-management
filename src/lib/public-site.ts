export type PublicIconKey =
  | "atom"
  | "book"
  | "compass"
  | "heart"
  | "landmark"
  | "leaf"
  | "library"
  | "lightbulb"
  | "microscope"
  | "music"
  | "notebook"
  | "shield"
  | "spark"
  | "sports"
  | "transport"
  | "users";

export type MotionPresetKey =
  | "heroCaption"
  | "heroMedia"
  | "sectionReveal"
  | "stagger"
  | "cardHover"
  | "marquee"
  | "pageTransition";

export interface PublicCta {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  note?: string;
}

export interface PublicNavItem {
  title: string;
  href: string;
  description: string;
}

export interface ImageAssetSlot {
  id: string;
  title: string;
  purpose: string;
  recommendedRatio: string;
  replacementNote: string;
  src: string;
  alt: string;
}

export interface PublicHeroMedia {
  slotId: ImageAssetSlot["id"];
  src: string;
  alt: string;
  focalPoint?: string;
}

export interface PublicSectionBlock {
  eyebrow?: string;
  title: string;
  description: string;
  icon?: PublicIconKey;
  cta?: PublicCta;
  mediaSlotId?: ImageAssetSlot["id"];
}

export interface PublicHeroPanel {
  eyebrow?: string;
  title: string;
  description: string;
  items?: string[];
}

export interface PublicPageHero extends PublicSectionBlock {
  media: PublicHeroMedia;
  highlights?: string[];
  panel?: PublicHeroPanel;
}

export const schoolProfile = {
  name: "Meridian Heights School",
  shortName: "Meridian Heights",
  location: "Ahmedabad, Gujarat",
  address: "Shilaj Road, Ahmedabad, Gujarat 380059",
  phone: "+91 98765 43210",
  email: "admissions@meridianheights.edu",
  visitHours: "Monday to Saturday, 8:30 AM to 4:30 PM",
  tagline: "Scholarship, character, and purposeful activity in one institutional campus.",
  admissionsNote: "Admissions open for the 2026 academic year. Campus visits by appointment.",
  placeholderNotice:
    "Meridian Heights School is a placeholder identity for the frontend concept and should be replaced with the real school brand, copy, and metrics.",
};

export const publicNavItems: PublicNavItem[] = [
  {
    title: "Home",
    href: "/",
    description: "Institutional introduction and admissions entry point.",
  },
  {
    title: "About",
    href: "/about",
    description: "School philosophy, leadership, and values.",
  },
  {
    title: "Academics",
    href: "/academics",
    description: "Curriculum, learning model, and faculty culture.",
  },
  {
    title: "Admissions",
    href: "/admissions",
    description: "Process, eligibility, documents, and inquiry flow.",
  },
  {
    title: "Student Life",
    href: "/student-life",
    description: "Clubs, arts, sports, wellbeing, and events.",
  },
  {
    title: "Campus",
    href: "/campus",
    description: "Facilities, safety, transport, and campus visits.",
  },
];

export const admissionsCta: PublicCta = {
  label: "Begin Admission Journey",
  href: "/admissions",
  variant: "primary",
  note: "Primary CTA across header, hero, and footer.",
};

export const campusVisitCta: PublicCta = {
  label: "Plan a Campus Visit",
  href: "/campus",
  variant: "secondary",
};

export const imageAssetSlots: ImageAssetSlot[] = [
  {
    id: "home-hero",
    title: "Homepage Hero",
    purpose: "Full-screen institutional landing image with strong left-caption composition.",
    recommendedRatio: "16:9 panoramic",
    replacementNote: "Use a real school-wide activity photograph with architectural depth and space for left-side copy.",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=80",
    alt: "Students moving through a bright academic campus courtyard.",
  },
  {
    id: "about-culture",
    title: "About Culture",
    purpose: "Collaborative learning scene supporting school philosophy and culture.",
    recommendedRatio: "4:5 portrait or 16:10 landscape",
    replacementNote: "Replace with a real classroom, seminar, or assembly photograph that reflects the school tone.",
    src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1400&q=80",
    alt: "Students in a collaborative school learning session.",
  },
  {
    id: "academics-hero",
    title: "Academics Hero",
    purpose: "Focused image for curriculum and inquiry-driven learning.",
    recommendedRatio: "16:9 panoramic",
    replacementNote: "Use an academic studio, lab, or mentor-led session with visible concentration and teaching presence.",
    src: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1800&q=80",
    alt: "A student engaged in focused classroom work.",
  },
  {
    id: "library",
    title: "Library and Knowledge Spaces",
    purpose: "Support library, reading, and quiet scholarship storytelling.",
    recommendedRatio: "3:2 landscape",
    replacementNote: "Prefer an actual library interior with students reading or browsing.",
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1400&q=80",
    alt: "A library space filled with books and warm study lighting.",
  },
  {
    id: "student-life-hero",
    title: "Student Life Hero",
    purpose: "Energy-led image for co-curricular culture and activity narrative.",
    recommendedRatio: "16:9 panoramic",
    replacementNote: "Replace with a real activity image covering sports, club work, performance, or student leadership.",
    src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1800&q=80",
    alt: "Students participating in an energetic co-curricular activity.",
  },
  {
    id: "campus-hero",
    title: "Campus Hero",
    purpose: "Architectural or facilities-led image for campus overview.",
    recommendedRatio: "16:9 panoramic",
    replacementNote: "Use the actual school facade, central courtyard, or a defining campus architecture view.",
    src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=80",
    alt: "A large academic campus building with open circulation spaces.",
  },
  {
    id: "science-lab",
    title: "Science and Innovation",
    purpose: "Lab or technology setting for academic and campus pages.",
    recommendedRatio: "16:10 landscape",
    replacementNote: "Replace with actual STEM lab photography with instruments, prototypes, or mentor interaction.",
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    alt: "Students and mentors working together in a modern learning lab.",
  },
  {
    id: "arts-culture",
    title: "Arts and Expression",
    purpose: "Support student-life storytelling around music, theatre, and visual arts.",
    recommendedRatio: "4:5 portrait or 16:10 landscape",
    replacementNote: "Use authentic performance, rehearsal, or studio imagery from the school.",
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1400&q=80",
    alt: "Students engaged in creative arts activity.",
  },
  {
    id: "admissions-conversation",
    title: "Admissions and Family Interaction",
    purpose: "Warm but formal scene for admissions inquiry and visit sections.",
    recommendedRatio: "3:2 landscape",
    replacementNote: "Replace with campus visit, reception, or counselling desk imagery from the school.",
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    alt: "Families and school representatives in a guided conversation.",
  },
  {
    id: "wellbeing",
    title: "Wellbeing and Mentorship",
    purpose: "Support pastoral care, mentorship, and student support storytelling.",
    recommendedRatio: "3:2 landscape",
    replacementNote: "Use authentic mentor-student interaction or wellbeing activity photography.",
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1400&q=80",
    alt: "Students with a mentor in a calm support-focused environment.",
  },
];

export const imageAssetMap = Object.fromEntries(imageAssetSlots.map((slot) => [slot.id, slot])) as Record<
  ImageAssetSlot["id"],
  ImageAssetSlot
>;

export const publicPageHeroes: Record<"home" | "about" | "academics" | "admissions" | "studentLife" | "campus", PublicPageHero> = {
  home: {
    eyebrow: "Modern Institutional School",
    title: "A school shaped by scholarship, character, and a culture of meaningful activity.",
    description:
      "Meridian Heights is presented as a contemporary institution where academic depth, disciplined design, and future-ready learning live together in one confident campus experience.",
    media: {
      slotId: "home-hero",
      src: imageAssetMap["home-hero"].src,
      alt: imageAssetMap["home-hero"].alt,
      focalPoint: "center",
    },
    highlights: ["Inquiry-led learning", "Visible student activity", "Admissions-first journey"],
    panel: {
      eyebrow: "Campus Rhythm",
      title: "Learning extends beyond the classroom.",
      description:
        "From labs and libraries to athletics and arts, every major touchpoint should reinforce discipline, curiosity, and institutional confidence.",
      items: ["Scholarship", "Student life", "Campus visits"],
    },
  },
  about: {
    eyebrow: "About The School",
    title: "A disciplined school identity built on trust, rigour, and clear educational purpose.",
    description:
      "The public site should position the school as dependable and forward-looking, with leadership credibility, strong values, and a campus culture families can read immediately.",
    media: {
      slotId: "about-culture",
      src: imageAssetMap["about-culture"].src,
      alt: imageAssetMap["about-culture"].alt,
      focalPoint: "center",
    },
    highlights: ["Leadership presence", "Purposeful values", "Institutional continuity"],
    panel: {
      eyebrow: "Identity",
      title: "Not just modern. Structured.",
      description:
        "The school should feel calm, established, and intellectually active rather than playful, trendy, or generic.",
    },
  },
  academics: {
    eyebrow: "Academic Life",
    title: "Curriculum depth, mentor-led learning, and spaces designed for concentration.",
    description:
      "The academics page should explain how the school teaches, how learners grow across stages, and why the environment supports deep knowledge work.",
    media: {
      slotId: "academics-hero",
      src: imageAssetMap["academics-hero"].src,
      alt: imageAssetMap["academics-hero"].alt,
      focalPoint: "center",
    },
    highlights: ["Foundational years", "Middle years", "Senior years"],
    panel: {
      eyebrow: "Learning Model",
      title: "Stage-wise growth with academic continuity.",
      description:
        "Show clear progression from foundational confidence to analytical independence and future pathways.",
      items: ["Core curriculum", "Mentor guidance", "Applied learning"],
    },
  },
  admissions: {
    eyebrow: "Admissions",
    title: "A clear, reassuring entry process for families evaluating the school.",
    description:
      "Admissions should feel transparent and premium: process clarity, documentation readiness, visit planning, and confident institutional communication.",
    media: {
      slotId: "admissions-conversation",
      src: imageAssetMap["admissions-conversation"].src,
      alt: imageAssetMap["admissions-conversation"].alt,
      focalPoint: "center",
    },
    highlights: ["Simple process", "Visit-ready campus", "Saved to admissions desk"],
    panel: {
      eyebrow: "Admissions Note",
      title: "Backend foundation is now active.",
      description:
        "Public admissions and campus visit requests now persist into the admin admissions desk, while scheduling automation and document uploads remain future phases.",
    },
  },
  studentLife: {
    eyebrow: "Student Life",
    title: "Clubs, arts, sport, wellbeing, and leadership woven into everyday school life.",
    description:
      "This page should make the campus feel active and human without losing the school's strong academic and institutional stance.",
    media: {
      slotId: "student-life-hero",
      src: imageAssetMap["student-life-hero"].src,
      alt: imageAssetMap["student-life-hero"].alt,
      focalPoint: "center",
    },
    highlights: ["Co-curricular depth", "Belonging", "Student agency"],
    panel: {
      eyebrow: "Beyond Timetables",
      title: "Activity with direction.",
      description:
        "The narrative should show that student life here is structured, mentored, and tied back to growth and character.",
      items: ["Clubs", "Athletics", "Arts", "Care"],
    },
  },
  campus: {
    eyebrow: "Campus & Facilities",
    title: "Spaces that communicate safety, focus, and institutional readiness from the first visit.",
    description:
      "Campus storytelling should balance architecture, academic infrastructure, student support, and practical family decision points like transport and visits.",
    media: {
      slotId: "campus-hero",
      src: imageAssetMap["campus-hero"].src,
      alt: imageAssetMap["campus-hero"].alt,
      focalPoint: "center",
    },
    highlights: ["Visit planning", "Safety and supervision", "Facilities overview"],
    panel: {
      eyebrow: "Visit Experience",
      title: "Families should be able to imagine the school in use.",
      description:
        "This page anchors campus narrative, contact information, and the visit-oriented CTA path for the public frontend.",
    },
  },
};
