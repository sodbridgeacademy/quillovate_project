import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Eye,
  Lock,
  X,
} from 'lucide-react';
import {
  CONTACT_EMAIL,
  InsightArticle,
  PROJECT_TYPE_OPTIONS,
  PolicyDocument,
  ServiceDivision,
  SessionVideo,
  TestimonialItem,
} from '../data/quillovateData';
import { YouTubeInteractivePlayer } from './YouTubeMockFrame';

interface ModalShellProps {
  onClose: () => void;
  titleId: string;
  maxWidthClass?: string;
  children: React.ReactNode;
}

function ModalShell({
  onClose,
  titleId,
  maxWidthClass = 'max-w-2xl',
  children,
}: ModalShellProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-primary/55 dark:bg-black/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className={`relative w-full ${maxWidthClass} max-h-[90vh] overflow-y-auto bg-warm-ivory dark:bg-[#0B1522] text-charcoal dark:text-[#E9E6DF] border border-soft-stone dark:border-white/15 rounded-sm shadow-2xl p-6 sm:p-8`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-muted-grey hover:text-primary dark:text-[#E9E6DF]/70 dark:hover:text-white rounded-sm transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

interface ProjectBriefModalProps {
  initialDivision?: ServiceDivision;
  onClose: () => void;
}

export function ProjectBriefModal({
  initialDivision = 'academic',
  onClose,
}: ProjectBriefModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [division, setDivision] = useState<ServiceDivision>(initialDivision);
  const [projectType, setProjectType] = useState<string>(
    initialDivision === 'academic' ? 'assignments' : 'whitepaper'
  );
  const [timeline, setTimeline] = useState('4–6 weeks');
  const [brief, setBrief] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleDivisionChange = (nextDivision: ServiceDivision) => {
    setDivision(nextDivision);
    const firstOption = PROJECT_TYPE_OPTIONS.find(
      (opt) => opt.division === nextDivision
    );
    if (firstOption) {
      setProjectType(firstOption.value);
    }
  };

  const selectedTypeLabel =
    PROJECT_TYPE_OPTIONS.find((o) => o.value === projectType)?.label ??
    'Assignments & Coursework';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBrief = brief.trim();

    if (!trimmedName) {
      setError('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (trimmedBrief.length < 20) {
      setError(
        'Please share at least a short overview of your assignment, manuscript, or communication brief.'
      );
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <ModalShell onClose={onClose} titleId="project-brief-title">
      {submitted ? (
        <div className="py-6 text-center">
          <div className="w-12 h-12 rounded-full bg-primary-gold/15 text-primary-gold mx-auto flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary-gold dark:text-pale-gold block mb-2">
            Inquiry Recorded
          </span>
          <h3
            id="project-brief-title"
            className="font-serif text-2xl sm:text-3xl font-semibold text-primary dark:text-white"
          >
            Thank you, {name.trim()}.
          </h3>
          <p className="text-sm text-charcoal/80 dark:text-[#E9E6DF]/80 mt-4 max-w-md mx-auto leading-relaxed">
            Your{' '}
            <span className="font-semibold text-primary dark:text-white">
              {selectedTypeLabel}
            </span>{' '}
            brief has been prepared for review. Our editorial desk responds to all inquiries within one business day via{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-primary dark:text-pale-gold underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <div className="mt-6 p-4 bg-white dark:bg-[#0e1a2b] border border-soft-stone dark:border-white/10 rounded-sm text-left text-xs space-y-1.5 max-w-md mx-auto">
            <p>
              <span className="text-muted-grey dark:text-[#E9E6DF]/60">Division:</span>{' '}
              <span className="font-medium text-primary dark:text-white">
                {division === 'academic' ? 'Academic Services' : 'Professional Services'}
              </span>
            </p>
            <p>
              <span className="text-muted-grey dark:text-[#E9E6DF]/60">Project Type:</span>{' '}
              <span className="font-medium text-primary dark:text-white">
                {selectedTypeLabel}
              </span>
            </p>
            <p>
              <span className="text-muted-grey dark:text-[#E9E6DF]/60">Target Timeline:</span>{' '}
              <span className="font-medium text-primary dark:text-white">{timeline}</span>
            </p>
            <p>
              <span className="text-muted-grey dark:text-[#E9E6DF]/60">Reply Email:</span>{' '}
              <span className="font-medium text-primary dark:text-white">{email.trim()}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-8 inline-flex items-center justify-center px-7 py-3 min-h-[44px] bg-primary dark:bg-primary-gold text-white text-sm font-medium rounded-sm hover:bg-primary-gold dark:hover:bg-pale-gold dark:hover:text-primary transition-colors cursor-pointer"
          >
            Return to Page
          </button>
        </div>
      ) : (
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary-gold dark:text-pale-gold block mb-2">
            Consultation Inquiry
          </span>
          <h3
            id="project-brief-title"
            className="font-serif text-2xl sm:text-3xl font-semibold text-primary dark:text-white pr-8"
          >
            Start a Project with Quillovate
          </h3>
          <p className="text-sm text-muted-grey dark:text-[#E9E6DF]/75 mt-2 leading-relaxed">
            Share the contours of your assignment, manuscript, research paper, or institutional brief so we can match the right editorial specialist.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-primary dark:text-pale-gold mb-2">
                Service Division
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleDivisionChange('academic')}
                  className={`min-h-[44px] px-4 py-2.5 text-left border rounded-sm transition-colors cursor-pointer ${
                    division === 'academic'
                      ? 'bg-primary text-white border-primary dark:bg-primary-gold dark:border-primary-gold'
                      : 'bg-white dark:bg-[#0e1a2b] text-charcoal dark:text-[#E9E6DF] border-soft-stone dark:border-white/15 hover:border-primary-gold'
                  }`}
                >
                  <span className="block text-sm font-semibold">Academic Services</span>
                  <span className="block text-xs opacity-80">
                    Assignments, theses &amp; manuscripts
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDivisionChange('professional')}
                  className={`min-h-[44px] px-4 py-2.5 text-left border rounded-sm transition-colors cursor-pointer ${
                    division === 'professional'
                      ? 'bg-primary text-white border-primary dark:bg-primary-gold dark:border-primary-gold'
                      : 'bg-white dark:bg-[#0e1a2b] text-charcoal dark:text-[#E9E6DF] border-soft-stone dark:border-white/15 hover:border-primary-gold'
                  }`}
                >
                  <span className="block text-sm font-semibold">Professional Services</span>
                  <span className="block text-xs opacity-80">
                    Whitepapers, reports &amp; strategy
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="brief-project-type"
                  className="block text-xs font-semibold uppercase tracking-wider text-primary dark:text-pale-gold mb-1.5"
                >
                  Project / Service Option
                </label>
                <select
                  id="brief-project-type"
                  value={projectType}
                  onChange={(e) => {
                    const val = e.target.value;
                    setProjectType(val);
                    const matched = PROJECT_TYPE_OPTIONS.find((o) => o.value === val);
                    if (matched) setDivision(matched.division);
                  }}
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white dark:bg-[#0e1a2b] border border-soft-stone dark:border-white/15 rounded-sm text-charcoal dark:text-white focus:outline-none focus:border-primary-gold"
                >
                  <optgroup label="Academic Services">
                    {PROJECT_TYPE_OPTIONS.filter((o) => o.division === 'academic').map(
                      (opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      )
                    )}
                  </optgroup>
                  <optgroup label="Professional Services">
                    {PROJECT_TYPE_OPTIONS.filter((o) => o.division === 'professional').map(
                      (opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      )
                    )}
                  </optgroup>
                </select>
              </div>
              <div>
                <label
                  htmlFor="brief-timeline"
                  className="block text-xs font-semibold uppercase tracking-wider text-primary dark:text-pale-gold mb-1.5"
                >
                  Desired Timeline
                </label>
                <select
                  id="brief-timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white dark:bg-[#0e1a2b] border border-soft-stone dark:border-white/15 rounded-sm text-charcoal dark:text-white focus:outline-none focus:border-primary-gold"
                >
                  <option value="48–72 hours">48–72 hours (Priority Review)</option>
                  <option value="1–2 weeks">1–2 weeks (Short Turnaround)</option>
                  <option value="4–6 weeks">4–6 weeks (Standard)</option>
                  <option value="2–3 months">2–3 months (Extended Monograph)</option>
                  <option value="Flexible / Ongoing">Flexible / Ongoing Retainer</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="brief-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-primary dark:text-pale-gold mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="brief-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Eleanor Vance"
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white dark:bg-[#0e1a2b] border border-soft-stone dark:border-white/15 rounded-sm text-charcoal dark:text-white focus:outline-none focus:border-primary-gold"
                />
              </div>
              <div>
                <label
                  htmlFor="brief-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-primary dark:text-pale-gold mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="brief-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.edu"
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white dark:bg-[#0e1a2b] border border-soft-stone dark:border-white/15 rounded-sm text-charcoal dark:text-white focus:outline-none focus:border-primary-gold"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="brief-org"
                className="block text-xs font-semibold uppercase tracking-wider text-primary dark:text-pale-gold mb-1.5"
              >
                Institution or Organisation (Optional)
              </label>
              <input
                id="brief-org"
                type="text"
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
                placeholder="University / Advisory Firm"
                className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white dark:bg-[#0e1a2b] border border-soft-stone dark:border-white/15 rounded-sm text-charcoal dark:text-white focus:outline-none focus:border-primary-gold"
              />
            </div>

            <div>
              <label
                htmlFor="brief-summary"
                className="block text-xs font-semibold uppercase tracking-wider text-primary dark:text-pale-gold mb-1.5"
              >
                Project Scope &amp; Objectives
              </label>
              <textarea
                id="brief-summary"
                rows={4}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Describe your assignment, manuscript, or document type, approximate word count, subject domain, and the editorial or research support required..."
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#0e1a2b] border border-soft-stone dark:border-white/15 rounded-sm text-charcoal dark:text-white focus:outline-none focus:border-primary-gold"
              />
            </div>

            {error && (
              <p role="alert" className="text-xs font-medium text-red-700 dark:text-red-400">
                {error}
              </p>
            )}

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-soft-stone dark:border-white/10">
              <div className="flex items-center gap-2 text-xs text-muted-grey dark:text-[#E9E6DF]/65">
                <Lock className="w-3.5 h-3.5 text-primary-gold shrink-0" />
                <span>Strict NDA &amp; IP protection on all submissions.</span>
              </div>
              <button
                type="submit"
                className="min-h-[44px] px-7 py-2.5 bg-primary dark:bg-primary-gold text-white text-sm font-medium rounded-sm hover:bg-primary-gold dark:hover:bg-pale-gold dark:hover:text-primary transition-colors cursor-pointer shrink-0"
              >
                Submit Project Brief
              </button>
            </div>
          </form>
        </div>
      )}
    </ModalShell>
  );
}

interface ArticleModalProps {
  article: InsightArticle;
  onClose: () => void;
  onStartProject: () => void;
}

export function ArticleModal({ article, onClose, onStartProject }: ArticleModalProps) {
  return (
    <ModalShell onClose={onClose} titleId="article-modal-title">
      <div className="pr-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-grey dark:text-[#E9E6DF]/70 mb-3">
          <span className="uppercase tracking-wider font-semibold text-primary-gold dark:text-pale-gold">
            {article.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>{article.publishedLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>
        <h3
          id="article-modal-title"
          className="font-serif text-2xl sm:text-3xl font-semibold text-primary dark:text-white leading-snug"
        >
          {article.title}
        </h3>
        <p className="text-xs font-medium text-muted-grey dark:text-[#E9E6DF]/60 mt-2">
          By {article.author}
        </p>
      </div>

      <div className="mt-6 pt-6 border-t border-soft-stone dark:border-white/10 space-y-4 text-sm sm:text-base text-charcoal/90 dark:text-[#E9E6DF]/90 leading-relaxed">
        {article.body.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-8 pt-5 border-t border-soft-stone dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-muted-grey dark:text-[#E9E6DF]/70">
          Need editorial counsel on a comparable manuscript or briefing?
        </p>
        <button
          type="button"
          onClick={() => {
            onClose();
            onStartProject();
          }}
          className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary dark:bg-primary-gold text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-primary-gold dark:hover:bg-pale-gold dark:hover:text-primary transition-colors cursor-pointer shrink-0"
        >
          <span>Discuss a Project</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </ModalShell>
  );
}

interface SessionPlayerModalProps {
  session: SessionVideo;
  onClose: () => void;
}

export function SessionPlayerModal({ session, onClose }: SessionPlayerModalProps) {
  return (
    <ModalShell onClose={onClose} titleId="session-player-title" maxWidthClass="max-w-3xl">
      <div className="pr-8 mb-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-grey dark:text-[#E9E6DF]/70 mb-2">
          <span className="uppercase tracking-wider font-semibold text-primary-gold dark:text-pale-gold">
            {session.category}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{session.date}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 tabular-nums">
            <Eye className="w-3.5 h-3.5" />
            <span>{session.views}</span>
          </span>
        </div>
        <h3
          id="session-player-title"
          className="font-serif text-xl sm:text-2xl font-semibold text-primary dark:text-white leading-snug"
        >
          {session.title}
        </h3>
        <p className="text-xs text-muted-grey dark:text-[#E9E6DF]/70 mt-1">
          {session.speakers}
        </p>
      </div>

      <YouTubeInteractivePlayer
        title={session.title}
        speakerLine={session.speakers}
        duration={session.duration}
        quoteOrSummary={session.summary}
        youtubeId={session.youtubeId}
      />

      <div className="mt-5 pt-5 border-t border-soft-stone dark:border-white/10">
        <h4 className="text-xs font-bold uppercase tracking-wider text-primary dark:text-pale-gold mb-3">
          Session Chapters
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm">
          {session.chapters.map((chap) => (
            <li
              key={chap.time}
              className="flex items-start gap-3 text-charcoal/85 dark:text-[#E9E6DF]/85"
            >
              <span className="font-mono tabular-nums text-primary-gold dark:text-pale-gold font-semibold shrink-0">
                {chap.time}
              </span>
              <span>{chap.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </ModalShell>
  );
}

interface TestimonialVideoModalProps {
  testimonial: TestimonialItem;
  onClose: () => void;
}

export function TestimonialVideoModal({
  testimonial,
  onClose,
}: TestimonialVideoModalProps) {
  const title = testimonial.videoTitle ?? `Client Reflection — ${testimonial.role}`;
  return (
    <ModalShell
      onClose={onClose}
      titleId="testimonial-video-title"
      maxWidthClass="max-w-3xl"
    >
      <div className="pr-8 mb-4">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary-gold dark:text-pale-gold block mb-1.5">
          Client Video Reflection
        </span>
        <h3
          id="testimonial-video-title"
          className="font-serif text-xl sm:text-2xl font-semibold text-primary dark:text-white leading-snug"
        >
          {title}
        </h3>
        <p className="text-xs text-muted-grey dark:text-[#E9E6DF]/70 mt-1">
          {testimonial.speakerName ? `${testimonial.speakerName} · ` : ''}
          {testimonial.role} · {testimonial.engagementContext}
        </p>
      </div>

      <YouTubeInteractivePlayer
        title={title}
        speakerLine={`${testimonial.speakerName ?? testimonial.role} — ${testimonial.engagementContext}`}
        duration={testimonial.videoDuration ?? '02:00'}
        quoteOrSummary={testimonial.quote}
        youtubeId={testimonial.youtubeId}
      />

      <blockquote className="mt-5 pt-4 border-t border-soft-stone dark:border-white/10 font-serif italic text-sm sm:text-base text-charcoal/90 dark:text-[#E9E6DF]/90 leading-relaxed">
        {testimonial.quote}
      </blockquote>
    </ModalShell>
  );
}

interface PolicyModalProps {
  policy: PolicyDocument;
  onClose: () => void;
}

export function PolicyModal({ policy, onClose }: PolicyModalProps) {
  return (
    <ModalShell onClose={onClose} titleId="policy-modal-title" maxWidthClass="max-w-xl">
      <div className="pr-8">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary-gold dark:text-pale-gold block mb-2">
          Firm Governance · {policy.updated}
        </span>
        <h3
          id="policy-modal-title"
          className="font-serif text-2xl font-semibold text-primary dark:text-white"
        >
          {policy.title}
        </h3>
      </div>

      <div className="mt-6 space-y-5 pt-5 border-t border-soft-stone dark:border-white/10">
        {policy.sections.map((section) => (
          <div key={section.heading}>
            <h4 className="font-serif text-base font-semibold text-primary dark:text-pale-gold mb-1.5">
              {section.heading}
            </h4>
            <p className="text-sm text-charcoal/85 dark:text-[#E9E6DF]/85 leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="min-h-[44px] px-6 py-2.5 bg-primary dark:bg-primary-gold text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-primary-gold dark:hover:bg-pale-gold dark:hover:text-primary transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </ModalShell>
  );
}
