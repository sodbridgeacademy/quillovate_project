import { useState } from 'react';
import { ArrowLeft, Calendar, Eye } from 'lucide-react';
import {
  SESSIONS_VIDEOS,
  SessionCategory,
  SessionVideo,
} from '../data/quillovateData';
import { YouTubeThumbnailFrame } from './YouTubeMockFrame';

interface SessionsPageProps {
  onBackHome: () => void;
  onSelectSession: (session: SessionVideo) => void;
  onStartProject: () => void;
}

const CATEGORIES: ('All' | SessionCategory)[] = [
  'All',
  'Academic Research',
  'Editorial Craft',
  'Executive Strategy',
  'Publishing',
];

export function SessionsPage({
  onBackHome,
  onSelectSession,
  onStartProject,
}: SessionsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | SessionCategory>('All');

  const filteredSessions =
    selectedCategory === 'All'
      ? SESSIONS_VIDEOS
      : SESSIONS_VIDEOS.filter((s) => s.category === selectedCategory);

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-warm-ivory dark:bg-[#081220]">
      {/* Page Header Band */}
      <section className="py-12 sm:py-16 border-b border-soft-stone dark:border-white/10 bg-white dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={onBackHome}
            className="min-h-[44px] inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-primary dark:text-pale-gold hover:text-primary-gold transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary-gold dark:text-pale-gold block mb-2">
              Intellectual Exchange · YouTube Library
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-primary dark:text-white tracking-tight">
              Quillovate Sessions
            </h1>
            <p className="text-base sm:text-lg text-muted-grey dark:text-[#E9E6DF]/75 mt-4 leading-relaxed">
              In-depth conversations, roundtables, and editorial demonstrations with scholars, senior editors, and institutional leaders on research, writing, and communication craft.
            </p>
          </div>

          {/* Interactive Category Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter sessions by category"
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[40px] px-4 py-2 text-xs font-semibold tracking-wide rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-primary text-white dark:bg-primary-gold dark:text-white'
                      : 'bg-warm-ivory dark:bg-[#0e1a2b] text-charcoal dark:text-[#E9E6DF]/80 border border-soft-stone dark:border-white/10 hover:border-primary-gold'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sessions Video Grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSessions.map((session) => (
              <article
                key={session.id}
                className="bg-white dark:bg-[#0c1829] border border-soft-stone dark:border-white/10 rounded-sm overflow-hidden flex flex-col justify-between hover:border-primary-gold/50 transition-colors"
              >
                <div>
                  <YouTubeThumbnailFrame
                    title={session.title}
                    subtitle={session.speakers}
                    duration={session.duration}
                    category={session.category}
                    onPlay={() => onSelectSession(session)}
                  />

                  <div className="p-5 sm:p-6">
                    {/* Clean unboxed metadata: Category · Date · Views */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-grey dark:text-[#E9E6DF]/65 mb-3">
                      <span className="font-semibold uppercase tracking-wider text-primary-gold dark:text-pale-gold">
                        {session.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>{session.date}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 tabular-nums">
                        <Eye className="w-3.5 h-3.5 shrink-0" />
                        <span>{session.views}</span>
                      </span>
                    </div>

                    <h2 className="font-serif text-xl font-semibold text-primary dark:text-white leading-snug">
                      <button
                        type="button"
                        onClick={() => onSelectSession(session)}
                        className="text-left hover:text-primary-gold transition-colors cursor-pointer"
                      >
                        {session.title}
                      </button>
                    </h2>

                    <p className="text-xs font-medium text-charcoal/70 dark:text-[#E9E6DF]/70 mt-1.5">
                      {session.speakers}
                    </p>

                    <p className="text-sm text-charcoal/80 dark:text-[#E9E6DF]/80 mt-3 leading-relaxed">
                      {session.summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-soft-stone dark:border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectSession(session)}
                    className="min-h-[40px] text-xs font-semibold uppercase tracking-wider text-primary dark:text-pale-gold hover:text-primary-gold transition-colors cursor-pointer"
                  >
                    Watch Session
                  </button>
                  <span className="text-xs font-mono tabular-nums text-muted-grey dark:text-[#E9E6DF]/60">
                    {session.duration}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Editorial CTA */}
          <div className="mt-16 p-8 sm:p-10 bg-primary text-white rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                Have a manuscript, assignment, or publication in progress?
              </h3>
              <p className="text-sm text-warm-ivory/80 mt-2 leading-relaxed">
                Work directly with our academic and executive editorial specialists on structure, argumentation, and clarity.
              </p>
            </div>
            <button
              type="button"
              onClick={onStartProject}
              className="min-h-[44px] px-7 py-3 bg-primary-gold text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-pale-gold hover:text-primary transition-colors cursor-pointer shrink-0 self-start md:self-auto"
            >
              Start a Project
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
