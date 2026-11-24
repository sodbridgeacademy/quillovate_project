export type ServiceDivision = 'academic' | 'professional';

export interface ServiceOffering {
  id: ServiceDivision;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  focusAreas: string[];
  ctaLabel: string;
}

export interface ProjectTypeOption {
  value: string;
  label: string;
  division: ServiceDivision;
}

export interface FoundationPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
}

export interface InsightArticle {
  id: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  publishedLabel: string;
  body: string[];
}

export interface TestimonialItem {
  id: string;
  kind: 'text' | 'video';
  quote: string;
  role: string;
  speakerName?: string;
  engagementContext: string;
  videoDuration?: string;
  videoTitle?: string;
  videoDate?: string;
  videoViews?: string;
  youtubeId?: string;
  wide?: boolean;
}

export type SessionCategory =
  | 'Academic Research'
  | 'Editorial Craft'
  | 'Executive Strategy'
  | 'Publishing';

export interface SessionVideo {
  id: string;
  category: SessionCategory;
  date: string;
  views: string;
  duration: string;
  title: string;
  speakers: string;
  summary: string;
  chapters: { time: string; label: string }[];
  youtubeId?: string;
}

export interface PolicyDocument {
  id: string;
  title: string;
  updated: string;
  sections: {
    heading: string;
    content: string;
  }[];
}

export const LOGO_LIGHT_SRC =
  '/assets/aistudio/Quillovate_Navy_Gold_Logo-removebg-preview_42b4e43f.png';

export const LOGO_DARK_SRC =
  '/assets/aistudio/Quillovate_White_Gold_Logo.png';

export const CONTACT_EMAIL = 'inquiries@quillovate.com';
export const CONTACT_MAILTO =
  'mailto:inquiries@quillovate.com?subject=Project%20Inquiry%20%E2%80%94%20Quillovate';

export const HERO_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC6G25_NcRqoE-l8L0Bw7I6r5UdidtTTT1Fh6lX33tdny8O2AuPdJUt0LBbBewTBLBrMAl0fW3mVEnTUIpkwpg7OLcRGp8e_zOTszRxfWrBWGcZjGXkStA3zyEl86VCbiQSlfoZS9U5TSN-gl-5GxUt69J4FJh23dEqigq8OxoKwPUNh08hLYHzpDkMIMjmRTKO4ZxeccEMWuQUHE7-h1GxFoqdBueXqIMmMapK_voR';

export const SESSIONS_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBnFmooNg4gEMg0wK87dEmCjJgJ4UPAqakw51xX5Nah2lBkgE6vfDJWo_JST1gXk3vc2Ns1uygQI1dH0G4DJeaFDcE_kSzrpmWRTK6Zk3PlZ6V64GRn5rX50H9v443OYmfyLRWATkNL5iqCEJV-O5BtEEV0MDLKmHHy943opLkscEy1QwJZggAydkNmSr5u89iGt-xFy8fZ35W523cRcmyqg4hKx7-PDtX8xUY_YHXP';

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Why Quillovate', href: '#why-quillovate' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'Sessions', href: '#sessions' },
  { label: 'Insights', href: '#insights' },
  { label: 'Testimonials', href: '#testimonials' },
];

export const SERVICE_DIVISIONS: ServiceOffering[] = [
  {
    id: 'academic',
    kicker: 'Founding Specialisation',
    title: 'Academic Services',
    subtitle: 'Supporting research. Strengthening academic communication.',
    description:
      'We provide academic and research support to students, researchers, academics and professionals at different stages of their academic and research journeys.',
    focusAreas: [
      'Assignments & Coursework Development',
      'Dissertation & Thesis Refinement',
      'Journal Manuscript Editing & Peer Review Prep',
      'Research Proposal & Citation Integrity Review',
    ],
    ctaLabel: 'Explore Academic Services',
  },
  {
    id: 'professional',
    kicker: 'Communication & Strategy',
    title: 'Professional Services',
    subtitle: 'Helping individuals and organisations communicate with purpose.',
    description:
      'We develop and refine written materials that help individuals, professionals and organisations present ideas, document their work and communicate effectively.',
    focusAreas: [
      'Organisational Reports & Whitepapers',
      'Executive & Institutional Thought Leadership',
      'Content & Editorial Direction',
      'Strategic Corporate Documentation & Proposals',
    ],
    ctaLabel: 'Explore Professional Services',
  },
];

export const PROJECT_TYPE_OPTIONS: ProjectTypeOption[] = [
  { value: 'assignments', label: 'Assignments & Coursework', division: 'academic' },
  { value: 'dissertation', label: 'Dissertation & Thesis Refinement', division: 'academic' },
  { value: 'manuscript', label: 'Journal Manuscript & Peer Review Prep', division: 'academic' },
  { value: 'proposal-academic', label: 'Research Proposal Structuring', division: 'academic' },
  { value: 'whitepaper', label: 'Organisational Reports & Whitepapers', division: 'professional' },
  { value: 'thought-leadership', label: 'Executive & Institutional Thought Leadership', division: 'professional' },
  { value: 'editorial-direction', label: 'Content & Editorial Direction', division: 'professional' },
  { value: 'corporate-proposal', label: 'Strategic Corporate Documentation & Proposals', division: 'professional' },
];

export const FOUNDATION_PRINCIPLES: FoundationPrinciple[] = [
  {
    number: '01',
    title: 'A Thoughtful Process',
    description:
      'We take time to understand the conceptual foundation and nuances of your subject before formulating structure or language.',
  },
  {
    number: '02',
    title: 'Quality and Attention to Detail',
    description:
      'Every sentence, citation, and argument is subjected to meticulous review for cadence, precision, and persuasive weight.',
  },
  {
    number: '03',
    title: 'Expertise That Fits',
    description:
      'We pair your requirements with specialist competencies across academic domains and corporate sectors for optimal depth.',
  },
  {
    number: '04',
    title: 'A Collaborative Experience',
    description:
      'We treat clients as intellectual partners, providing transparent dialogue, constructive feedback, and iterative alignment.',
  },
];

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: '01',
    title: 'Understand',
    description:
      "Understand the client's needs, objectives, audience and project scope with thorough preliminary review.",
  },
  {
    number: '02',
    title: 'Assess',
    description:
      'Determine the appropriate expertise, scope, timeline and clear transparent quotation tailored to milestones.',
  },
  {
    number: '03',
    title: 'Develop',
    description:
      'Undertake the agreed writing, research-support, editing or content-development work in iterative stages.',
  },
  {
    number: '04',
    title: 'Refine and Deliver',
    description:
      'Review the work against agreed requirements and deliver the final output with complete academic and editorial precision.',
  },
];

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: 'thematic-frameworks',
    category: 'Academic Inquiry',
    readTime: '6 min read',
    title: 'Structuring Complex Thematic Frameworks in Postgraduate Research',
    excerpt:
      'Navigating multidisciplinary literature syntheses without losing methodological coherence or analytical rigor.',
    author: 'Quillovate Academic Editorial Desk',
    publishedLabel: 'Editorial Essay',
    body: [
      'Postgraduate theses and interdisciplinary monographs frequently stall not from a scarcity of evidence, but from an absence of architectural hierarchy across chapters. When multiple theoretical lenses converge, every section must earn its place inside a single overarching claim.',
      'A disciplined thematic framework begins by separating foundational definitions from empirical friction points. Rather than cataloguing studies chronologically, grouping scholarship by methodological tension reveals where your original contribution sits.',
      'During developmental review, we map each subsection to a clear argumentative verb—contextualising, contesting, calibrating, or synthesising—so supervisors and examiners can trace the intellectual line from abstract to conclusion without friction.',
    ],
  },
  {
    id: 'architecture-of-clarity',
    category: 'Editorial Craft',
    readTime: '4 min read',
    title: 'The Architecture of Clarity: Eliminating Rhetorical Noise in Executive Texts',
    excerpt:
      'How syntax discipline and deliberate pacing transform dense technical documentation into decisive leadership counsel.',
    author: 'Quillovate Advisory Practice',
    publishedLabel: 'Editorial Essay',
    body: [
      'Senior decision-makers rarely reject complex proposals because the underlying analysis is too technical; they disengage when the prose forces them to reconstruct the hierarchy of importance on every page.',
      'Clarity is not simplification. It is the deliberate alignment of topic sentences, quantitative evidence, and strategic implications so an informed reader grasps the central judgment within seconds while retaining full access to methodological detail.',
      'Removing nominalisations, passive hedging, and redundant preamble restores momentum to institutional reports, turning static internal records into authoritative documents ready for boards, regulators, and partners.',
    ],
  },
  {
    id: 'narrative-whitepapers',
    category: 'Professional Communication',
    readTime: '5 min read',
    title: 'Synthesising Technical Rigor and Narrative Accessibility in Whitepapers',
    excerpt:
      'Formulating institutional authority by balancing empirical demonstration with intuitive explanatory sequences.',
    author: 'Quillovate Strategy & Content Group',
    publishedLabel: 'Editorial Essay',
    body: [
      'Authoritative whitepapers bridge two audiences that seldom speak the same dialect: domain specialists who scrutinise every assumption, and institutional stakeholders evaluating strategic readiness.',
      'The most durable structure pairs a crisp conceptual narrative in the main column with disciplined technical callouts, benchmark definitions, and transparent citations—preserving intellectual honesty without interrupting flow.',
      'When editorial direction is anchored in primary research rather than promotional phrasing, a whitepaper stops reading like collateral and begins functioning as a reference text within its sector.',
    ],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'video-researcher',
    kind: 'video',
    speakerName: 'Dr. Amara Okafor',
    role: 'Postdoctoral Fellow & Monograph Author',
    engagementContext: 'Monograph Refinement · Humanities',
    videoTitle: 'Elevating a 90,000-Word Monograph for University Press Review',
    videoDuration: '02:18',
    videoDate: '18 Oct 2027',
    videoViews: '1,420 views',
    quote:
      '"Working with Quillovate transformed how my chapters held together conceptually. They never flattened my voice—they sharpened every transition until the editorial board approved the manuscript without structural revisions."',
  },
  {
    id: 'video-director',
    kind: 'video',
    speakerName: 'Marcus Reid',
    role: 'Director of Institutional Strategy',
    engagementContext: 'Multi-Stakeholder Whitepaper · Policy',
    videoTitle: 'Turning 140 Pages of Technical Research into Board-Ready Counsel',
    videoDuration: '01:54',
    videoDate: '04 Nov 2027',
    videoViews: '980 views',
    quote:
      '"Quillovate distilled three separate research workstreams into a single cohesive whitepaper that our trustees and external partners immediately understood and acted upon."',
  },
  {
    id: 'text-researcher',
    kind: 'text',
    quote:
      '"The editorial guidance provided during the refinement of our research monograph was exceptional. The intellectual depth and precision elevated the entire manuscript while preserving our distinct authorial voice."',
    role: 'Academic Researcher & Author',
    engagementContext: 'Monograph Refinement · Humanities',
  },
  {
    id: 'text-director',
    kind: 'text',
    quote:
      '"Quillovate brought structural clarity and persuasive rigor to our multi-stakeholder organisational proposal. A truly collaborative, professional team."',
    role: 'Institutional Director',
    engagementContext: 'Strategic Proposal · Non-Profit Sector',
  },
  {
    id: 'text-doctoral',
    kind: 'text',
    quote:
      '"Meticulous attention to detail in technical terminology and academic formatting. Their feedback helped us navigate peer-review with immense confidence."',
    role: 'Doctoral Candidate',
    engagementContext: 'Journal Manuscript Prep · Social Sciences',
  },
  {
    id: 'text-policy',
    kind: 'text',
    quote:
      '"The team has a rare ability to translate dense, intricate research insights into compelling executive prose without diluting scientific integrity."',
    role: 'Policy Think Tank Lead',
    engagementContext: 'Research Brief Series · Public Policy',
  },
  {
    id: 'text-faculty',
    kind: 'text',
    quote:
      '"Prompt, thoughtful, and deeply respectful of the nuances of our subject matter. Quillovate is an indispensable editorial partner for any scholar seeking rigorous presentation."',
    role: 'Senior Faculty Member',
    engagementContext: 'Peer-Reviewed Anthology · Higher Education',
    wide: true,
  },
];

export const SESSIONS_VIDEOS: SessionVideo[] = [
  {
    id: 'session-monograph',
    category: 'Academic Research',
    date: '14 Nov 2027',
    views: '2,480 views',
    duration: '42:18',
    title: 'From Dissertation to Monograph: Re-architecting Scholarly Voice',
    speakers: 'Dr. H. Mercer & Quillovate Senior Editors',
    summary:
      'Examining how early-career scholars transition away from defensive thesis signposting toward confident, publishable book manuscripts.',
    chapters: [
      { time: '00:00', label: 'Why dissertation prose stalls with press editors' },
      { time: '11:40', label: 'Re-framing literature reviews as active argument' },
      { time: '26:15', label: 'Chapter pacing and reader stamina across 80,000 words' },
    ],
  },
  {
    id: 'session-policy-briefs',
    category: 'Executive Strategy',
    date: '28 Oct 2027',
    views: '1,910 views',
    duration: '36:05',
    title: 'Evidence Without Jargon: Writing Institutional Policy Briefs',
    speakers: 'E. Vance & Advisory Practice Panel',
    summary:
      'Practical frameworks for distilling empirical datasets into clear briefing papers for executive committees and external stakeholders.',
    chapters: [
      { time: '00:00', label: 'Leading with the strategic decision, not methodology' },
      { time: '14:20', label: 'Structuring visual evidence and quantitative tables' },
      { time: '27:50', label: 'Anticipating committee objections in two pages' },
    ],
  },
  {
    id: 'session-citation-integrity',
    category: 'Publishing',
    date: '11 Oct 2027',
    views: '3,140 views',
    duration: '48:52',
    title: 'Citation Integrity & Ethical Boundaries in Contemporary Research',
    speakers: 'Quillovate Editorial Standards Board',
    summary:
      'Navigating institutional governance, provenance verification, and responsible editorial stewardship across academic disciplines.',
    chapters: [
      { time: '00:00', label: 'Provenance auditing before journal submission' },
      { time: '17:05', label: 'Distinguishing developmental editing from ghostwriting' },
      { time: '34:30', label: 'Cross-disciplinary citation standards (APA, Chicago, OSCOLA)' },
    ],
  },
  {
    id: 'session-syntax-clarity',
    category: 'Editorial Craft',
    date: '24 Sep 2027',
    views: '1,640 views',
    duration: '31:12',
    title: 'The Discipline of the Sentence: Rhythm & Precision in Long-Form Prose',
    speakers: 'C. Whitmore, Lead Developmental Editor',
    summary:
      'Line-by-line editing demonstrations showing how cadence, active verbs, and paragraph architecture elevate analytical authority.',
    chapters: [
      { time: '00:00', label: 'Diagnosing nominalisation overload in technical drafts' },
      { time: '12:45', label: 'Paragraph unity and topic-sentence discipline' },
      { time: '22:10', label: 'Live line-edit walkthrough on a policy whitepaper' },
    ],
  },
  {
    id: 'session-peer-review',
    category: 'Publishing',
    date: '06 Sep 2027',
    views: '2,095 views',
    duration: '39:44',
    title: 'Responding to Reviewer #2: Turning Critique into Publication',
    speakers: 'Prof. D. Aldridge & Quillovate Academic Desk',
    summary:
      'A methodical approach to reading revise-and-resubmit letters, building response matrices, and preserving core claims under critique.',
    chapters: [
      { time: '00:00', label: 'Separating structural critique from stylistic preference' },
      { time: '15:30', label: 'Drafting a calm, point-by-point response matrix' },
      { time: '29:40', label: 'Re-anchoring your abstract after major revisions' },
    ],
  },
  {
    id: 'session-assignments-rigor',
    category: 'Academic Research',
    date: '19 Aug 2027',
    views: '2,870 views',
    duration: '29:30',
    title: 'Structuring High-Distinction Postgraduate Assignments & Essays',
    speakers: 'Quillovate Academic Mentorship Team',
    summary:
      'How to unpack complex essay prompts, map balanced counter-arguments, and present critical synthesis within tight word limits.',
    chapters: [
      { time: '00:00', label: 'Deconstructing assessment rubrics and command verbs' },
      { time: '10:15', label: 'Allocating word budgets across introduction, critique & synthesis' },
      { time: '21:05', label: 'Signposting critical analysis rather than description' },
    ],
  },
];

export const POLICY_DOCUMENTS: Record<string, PolicyDocument> = {
  'editorial-code': {
    id: 'editorial-code',
    title: 'Editorial Code of Practice',
    updated: '2027 Edition',
    sections: [
      {
        heading: 'Authorship & Scholarly Integrity',
        content:
          'All academic editing, structural guidance, and research-support services strictly uphold institutional standards of original authorship, transparent citation, and ethical methodology.',
      },
      {
        heading: 'Editorial Precision',
        content:
          'Every engagement undergoes a multi-pass review covering conceptual coherence, structural signposting, terminological consistency, and adherence to target house styles.',
      },
    ],
  },
  'privacy-notice': {
    id: 'privacy-notice',
    title: 'Privacy & Confidentiality Notice',
    updated: '2027 Edition',
    sections: [
      {
        heading: 'Client & Manuscript Confidentiality',
        content:
          'All preliminary project briefs, drafts, datasets, and institutional communications shared with Quillovate are held in strict confidence and never disclosed to third parties.',
      },
      {
        heading: 'Data Minimisation',
        content:
          'Contact information submitted through consultation inquiries is used solely to scope, assess, and communicate regarding your requested editorial engagement.',
      },
    ],
  },
  'terms-of-engagement': {
    id: 'terms-of-engagement',
    title: 'Terms of Engagement',
    updated: '2027 Edition',
    sections: [
      {
        heading: 'Scope & Milestone Alignment',
        content:
          'Each project commences only after written confirmation of scope, specialist assignment, milestone dates, and a transparent fee schedule.',
      },
      {
        heading: 'Iterative Review Window',
        content:
          'Delivered manuscripts and organisational documents include a structured post-delivery clarification window to ensure complete alignment with client objectives.',
      },
    ],
  },
  'intellectual-property': {
    id: 'intellectual-property',
    title: 'Intellectual Property Charter',
    updated: '2027 Edition',
    sections: [
      {
        heading: '100% Client Ownership',
        content:
          'Upon completion and settlement of agreed project milestones, full rights to all final commissioned texts, whitepapers, and editorial deliverables rest exclusively with the client.',
      },
      {
        heading: 'Zero External Reuse',
        content:
          'Quillovate never repurposes client manuscripts, proprietary frameworks, or unreleased research findings for external publications or automated model training.',
      },
    ],
  },
  'ethics-policy': {
    id: 'ethics-policy',
    title: 'Research & Editorial Ethics Policy',
    updated: '2027 Edition',
    sections: [
      {
        heading: 'Conflict-of-Interest Screening',
        content:
          'Specialists are screened prior to assignment to ensure independence and avoid competing academic or commercial interests.',
      },
      {
        heading: 'Responsible Advisory Standards',
        content:
          'We decline commissions that fabricate empirical evidence, misrepresent institutional credentials, or violate university academic conduct regulations.',
      },
    ],
  },
};
