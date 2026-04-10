export type PublicNavItem = {
  title: string;
  href: string;
};

export type PublicCta = {
  label: string;
  href: string;
};

export type FeatureCard = {
  eyebrow: string;
  title: string;
  description?: string;
  color: "orange" | "green" | "blue" | "yellow" | "paper" | "cocoa" | "white";
};

export type TestimonialItem = {
  title: string;
  quote: string;
  color: "orange" | "green" | "blue";
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const schoolProfile = {
  name: "Edukids",
  shortName: "Edukids",
  location: "Ahmedabad, Gujarat",
  address: "Shilaj Road, Ahmedabad, Gujarat 380059",
  phone: "+91 98765 43210",
  email: "hello@edukids.edu",
  visitHours: "Monday to Saturday, 9:00 AM to 5:00 PM",
  tagline: "Putting your child's future in great motion.",
  admissionsNote: "Admissions open for the new academic year with friendly support for parents at every step.",
  heroImage: "/images/edukids-hero.webp",
};

export const publicNavItems: PublicNavItem[] = [
  { title: "Home", href: "/" },
  { title: "Programs", href: "/programs" },
  { title: "Highlights", href: "/highlights" },
  { title: "Testimonials", href: "/testimonials" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/contact" },
];

export const inquiryCta: PublicCta = {
  label: "Inquiry",
  href: "/inquiry",
};

export const admissionCta: PublicCta = {
  label: "Admission",
  href: "/admission",
};

export const homeStats = [
  { value: "50+", label: "Schools are supported", description: "Across 29 states" },
  { value: "12K+", label: "Helping the students", description: "Of all ages thrive" },
  { value: "70+", label: "Available field workspaces", description: "And increasing" },
];

export const homeHeroBadges = ["No Credit Card", "14 Days Trial", "Free For Teachers"];

export const homeLearningCards: FeatureCard[] = [
  {
    eyebrow: "Life Skills",
    title: "Life Skills for Kids",
    description: "Confidence-building experiences that help children communicate, collaborate, and lead.",
    color: "orange",
  },
  {
    eyebrow: "Imagination",
    title: "Imagination is power",
    description: "Project-led learning spaces where creativity turns into visible progress.",
    color: "green",
  },
  {
    eyebrow: "Growth",
    title: "Grow your own wings",
    description: "Daily routines that build independence, curiosity, and child confidence.",
    color: "blue",
  },
];

export const homeShapingCards: FeatureCard[] = [
  { eyebrow: "Class - Pre School", title: "Letter Identification", color: "white" },
  { eyebrow: "Fourth Grade", title: "General Knowledge", color: "white" },
  { eyebrow: "First Grade", title: "Geography Quiz", color: "white" },
  { eyebrow: "Sketching Class", title: "Visual Arts Training", color: "white" },
];

export const programHighlights: FeatureCard[] = [
  { eyebrow: "Early years", title: "Play-led foundation", color: "orange" },
  { eyebrow: "Primary", title: "Strong class growth", color: "green" },
  { eyebrow: "Activities", title: "Skill plus confidence", color: "blue" },
  { eyebrow: "Enrichment", title: "Art, sports, language", color: "yellow" },
];

export const programCards: FeatureCard[] = [
  {
    eyebrow: "Nursery",
    title: "Exploration",
    description: "Story, rhythm, movement, shapes, sound, and social comfort.",
    color: "white",
  },
  {
    eyebrow: "LKG / UKG",
    title: "Readiness",
    description: "Pre-literacy, numbers, expression, and classroom confidence.",
    color: "white",
  },
  {
    eyebrow: "Primary",
    title: "Progress",
    description: "Academic clarity with project work, curiosity, and guided outcomes.",
    color: "white",
  },
  {
    eyebrow: "Co-curricular",
    title: "Personality",
    description: "Sports, art, speaking, teamwork, and joy-driven participation.",
    color: "white",
  },
];

export const highlightHeroCards: FeatureCard[] = [
  { eyebrow: "Why choose us", title: "Warm and structured", color: "orange" },
  { eyebrow: "Facilities", title: "Safe and active", color: "green" },
  { eyebrow: "Classrooms", title: "Focused and bright", color: "blue" },
  { eyebrow: "Outcomes", title: "Growth and confidence", color: "yellow" },
];

export const highlightCards: FeatureCard[] = [
  {
    eyebrow: "Teachers",
    title: "Guided care",
    description: "Teacher warmth, attention, and classroom relationship building.",
    color: "white",
  },
  {
    eyebrow: "Campus",
    title: "Safe spaces",
    description: "Transport, entry systems, play zones, and supervision confidence.",
    color: "white",
  },
  {
    eyebrow: "Environment",
    title: "Joyful rhythm",
    description: "Events, celebration moments, teamwork, and school energy.",
    color: "white",
  },
  {
    eyebrow: "Families",
    title: "Parent trust",
    description: "Quotes, support commitments, and the tone that reassures new families.",
    color: "white",
  },
];

export const testimonialCards: TestimonialItem[] = [
  {
    title: "Warm and premium",
    quote: "The page feels polished, clear, and welcoming. It makes school communication feel trustworthy.",
    color: "orange",
  },
  {
    title: "Easy to act on",
    quote: "The inquiry and admission routes are clear even on mobile. Nothing feels confusing.",
    color: "green",
  },
  {
    title: "School-friendly tone",
    quote: "It feels playful for children but still professional enough for parents.",
    color: "blue",
  },
];

export const testimonialStats = [
  { value: "45M+", label: "Use this block for parent reach, community presence, or awareness metrics." },
  { value: "164+", label: "Use this block for activities, classroom projects, or event count." },
  { value: "98%", label: "A satisfaction-style storytelling point or success rate." },
  { value: "24/7", label: "An always-available support or response-language placeholder." },
];

export const faqItems: FaqItem[] = [
  {
    question: "How is this different from the admission page?",
    answer: "The admission page is conversion-first. FAQ reduces hesitation and helps parents understand the process before they apply.",
  },
  {
    question: "Can parents ask questions before filling a form?",
    answer: "Yes. Inquiry and contact pages stay available throughout the flow as support-first destinations.",
  },
  {
    question: "Is the mobile experience optimized?",
    answer: "Yes. The structure uses large tap targets, stacked cards, and sticky CTA patterns for smaller screens.",
  },
  {
    question: "Will this transition to React later without redesign?",
    answer: "Yes. These pages are intentionally built as section-based static layouts that can be split into reusable React components later.",
  },
];

export const contactCards: FeatureCard[] = [
  { eyebrow: "Phone", title: schoolProfile.phone, color: "orange" },
  { eyebrow: "WhatsApp", title: "Instant help", color: "green" },
  { eyebrow: "Office hours", title: "09:00 to 17:00", color: "blue" },
  { eyebrow: "Campus visit", title: "Book a school tour", color: "yellow" },
];

export const inquirySteps = [
  { value: "Call", description: "Clear route for parents who prefer direct conversation." },
  { value: "Ask", description: "Use a short inquiry form with just the essential fields." },
  { value: "Visit", description: "Push parents toward a school visit or warm follow-up." },
];

export const inquirySupportCards: FeatureCard[] = [
  {
    eyebrow: "Objection handling",
    title: "Not ready to apply yet?",
    description: "Parents can ask about fees, class levels, transport, timings, curriculum, or availability before choosing the next step.",
    color: "white",
  },
  {
    eyebrow: "Follow-up ready",
    title: "Perfect for callback flows",
    description: "The inquiry structure is short enough to convert well on mobile while still collecting useful context for a helpful follow-up.",
    color: "white",
  },
  {
    eyebrow: "Cross links",
    title: "Guide them to the right page",
    description: "Inquiry can naturally route to admission, programs, FAQ, or contact depending on what the parent needs next.",
    color: "white",
  },
];

export const admissionSteps = [
  "Fill the short form with student and parent details.",
  "Get quick assistance for visits, classes, and next steps.",
  "Continue with school follow-up through contact and WhatsApp.",
];
