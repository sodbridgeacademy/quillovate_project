import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  GraduationCap,
  MessageSquare,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ResilientImage } from './components/ResilientImage';
import { SessionsPage } from './components/SessionsPage';
import { YouTubeThumbnailFrame } from './components/YouTubeMockFrame';
import {
  ArticleModal,
  PolicyModal,
  ProjectBriefModal,
  SessionPlayerModal,
  TestimonialVideoModal,
} from './components/Modals';
import {
  APPROACH_STEPS,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  FOUNDATION_PRINCIPLES,
  HERO_IMAGE_URL,
  INSIGHT_ARTICLES,
  InsightArticle,
  LOGO_DARK_SRC,
  POLICY_DOCUMENTS,
  PolicyDocument,
  SESSIONS_IMAGE_URL,
  SERVICE_DIVISIONS,
  ServiceDivision,
  SessionVideo,
  TESTIMONIALS,
  TestimonialItem,
} from './data/quillovateData';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('quillovate-theme') === 'dark';
  });

  const [currentView, setCurrentView] = useState<'home' | 'sessions'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#sessions-library') {
      return 'sessions';
    }
    return 'home';
  });

  const [testimonialFilter, setTestimonialFilter] = useState<'all' | 'video' | 'text'>('all');
  const [briefModalDivision, setBriefModalDivision] = useState<ServiceDivision | null>(null);
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);
  const [activeSessionVideo, setActiveSessionVideo] = useState<SessionVideo | null>(null);
  const [activeTestimonialVideo, setActiveTestimonialVideo] =
    useState<TestimonialItem | null>(null);
  const [activePolicy, setActivePolicy] = useState<PolicyDocument | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('quillovate-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('quillovate-theme', 'light');
    }
  }, [isDark]);

  // Dynamic canonical & og:url SEO resolution
  useEffect(() => {
    const canonicalHref = window.location.origin + window.location.pathname;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalHref);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#sessions-library') {
        setCurrentView('sessions');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openSessionsPage = () => {
    setCurrentView('sessions');
    window.history.pushState(null, '', '#sessions-library');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHomeSection = (href: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      window.history.pushState(null, '', href === '#top' ? '#' : href);
      window.setTimeout(() => {
        if (href === '#top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
      return;
    }

    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openPolicy = (key: string) => {
    const doc = POLICY_DOCUMENTS[key];
    if (doc) setActivePolicy(doc);
  };

  const filteredTestimonials =
    testimonialFilter === 'all'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.kind === testimonialFilter);

  return (
    <div
      id="top"
      className="min-h-screen bg-background-light dark:bg-background-dark text-charcoal dark:text-[#E9E6DF] antialiased selection:bg-[#B78438]/20 selection:text-primary dark:selection:text-pale-gold transition-colors duration-200 overflow-x-hidden"
    >
      <Navbar
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onStartProject={() => setBriefModalDivision('academic')}
        onNavigateSection={navigateToHomeSection}
        onOpenSessionsPage={openSessionsPage}
        currentView={currentView}
      />

      {currentView === 'sessions' ? (
        <SessionsPage
          onBackHome={() => navigateToHomeSection('#top')}
          onSelectSession={(session) => setActiveSessionVideo(session)}
          onStartProject={() => setBriefModalDivision('academic')}
        />
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative bg-warm-ivory dark:bg-[#081220] py-12 sm:py-16 md:py-24 border-b border-soft-stone dark:border-[#022146]/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2.5 mb-5 sm:mb-6">
                    <span className="w-6 h-[1.5px] bg-primary-gold shrink-0" />
                    <span className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold text-primary-gold dark:text-pale-gold">
                      Professional Writing &amp; Editorial Consultancy
                    </span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-primary dark:text-white leading-[1.12] tracking-tight">
                    Where Ideas Find Their Words.
                  </h1>

                  <p className="text-lg sm:text-xl text-charcoal dark:text-[#E9E6DF] font-medium leading-relaxed mt-5 sm:mt-6">
                    Thoughtful writing, research support and editorial expertise for ideas worth communicating.
                  </p>

                  <p className="text-sm sm:text-base text-muted-grey dark:text-[#E9E6DF]/75 leading-relaxed mt-4 max-w-xl">
                    From academic research and assignments to professional communication, we help individuals and organisations develop, refine and communicate ideas with clarity, purpose and confidence.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setBriefModalDivision('academic')}
                      className="min-h-[44px] inline-flex items-center justify-center bg-primary text-white px-7 py-3.5 text-sm font-medium tracking-wide rounded-sm hover:bg-primary-gold transition-colors duration-200 shadow-sm dark:bg-primary-gold dark:hover:bg-pale-gold dark:hover:text-primary cursor-pointer"
                    >
                      Start a Project
                    </button>
                    <a
                      href="#services"
                      className="min-h-[44px] inline-flex items-center justify-center border border-primary/30 dark:border-pale-gold/30 text-primary dark:text-pale-gold px-7 py-3.5 text-sm font-medium tracking-wide rounded-sm hover:border-primary-gold hover:text-primary-gold dark:hover:border-pale-gold dark:hover:text-white transition-colors duration-200"
                    >
                      Explore Our Services
                    </a>
                  </div>

                  <div className="mt-10 sm:mt-12 pt-7 sm:pt-8 border-t border-soft-stone dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-gold mt-2 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-pale-gold">
                          Academic &amp; Research Specialisation
                        </p>
                        <p className="font-normal text-muted-grey dark:text-[#E9E6DF]/65 mt-0.5 text-xs leading-relaxed">
                          Assignments, monographs, peer-reviewed articles &amp; proposals
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-gold mt-2 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-pale-gold">
                          Corporate &amp; Organisational Communication
                        </p>
                        <p className="font-normal text-muted-grey dark:text-[#E9E6DF]/65 mt-0.5 text-xs leading-relaxed">
                          Whitepapers, institutional reports &amp; leadership briefs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="relative group">
                    <div className="absolute -top-3 -right-3 w-full h-full border border-primary-gold/40 z-0 rounded-sm pointer-events-none hidden sm:block" />
                    <div className="relative z-10 overflow-hidden rounded-sm border border-soft-stone dark:border-white/10 bg-white dark:bg-primary shadow-xl">
                      <ResilientImage
                        src={HERO_IMAGE_URL}
                        alt="Scholarly writing and research manuscript desk"
                        fallbackTitle="Foundational Inquiry & Craftsmanship"
                        className="w-full h-[320px] sm:h-[440px] lg:h-[520px] object-cover filter contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-primary/95 via-primary/75 to-transparent text-white">
                        <span className="text-xs tracking-widest uppercase text-pale-gold font-medium block mb-1">
                          Foundational Inquiry
                        </span>
                        <p className="text-sm font-serif italic text-white/95 leading-snug">
                          &ldquo;Craftsmanship in scholarship &amp; professional inquiry.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Philosophy Statement Section */}
          <section className="py-16 sm:py-20 lg:py-24 bg-warm-ivory dark:bg-[#07101b] border-b border-soft-stone dark:border-white/5 transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
              <div className="w-12 h-0.5 bg-primary-gold mx-auto mb-6" />
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-primary dark:text-[#F7F5F0] font-semibold tracking-tight">
                Good ideas deserve to be communicated well.
              </h2>
              <div className="text-base sm:text-lg text-charcoal/90 dark:text-[#E9E6DF]/90 leading-relaxed mt-6 sm:mt-8 space-y-5 font-normal">
                <p>
                  Every meaningful piece of writing begins with an idea. Turning that idea into something clear, coherent and impactful takes research, structure, critical thinking and attention to detail.
                </p>
                <p className="text-sm sm:text-base text-muted-grey dark:text-[#E9E6DF]/75">
                  At Quillovate, we work with individuals and organisations to develop, strengthen and communicate their ideas through professional writing, research support and editorial services.
                </p>
              </div>
            </div>
          </section>

          {/* Practice Divisions / Services Section */}
          <section
            id="services"
            className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-background-dark border-b border-soft-stone dark:border-white/5"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
              <div className="max-w-2xl mb-12 sm:mb-16">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary-gold dark:text-pale-gold block mb-2">
                  Practice Divisions
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-primary dark:text-white font-semibold tracking-tight">
                  Writing and editorial support for different purposes.
                </h2>
                <p className="text-sm sm:text-base text-muted-grey dark:text-[#E9E6DF]/75 mt-3">
                  Two principal service divisions tailored to distinct communicative goals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {SERVICE_DIVISIONS.map((service) => {
                  const isAcademic = service.id === 'academic';
                  return (
                    <div
                      key={service.id}
                      className={`${
                        isAcademic
                          ? 'bg-warm-ivory dark:bg-[#0e1a2b] border-t-primary-gold'
                          : 'bg-soft-stone/40 dark:bg-[#0B1522] border-t-primary dark:border-t-pale-gold'
                      } border border-soft-stone dark:border-white/10 border-t-4 p-6 sm:p-8 lg:p-10 rounded-sm flex flex-col justify-between hover:shadow-lg transition-all duration-300`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <span
                            className={`text-[11px] font-bold tracking-widest uppercase ${
                              isAcademic
                                ? 'text-primary-gold dark:text-pale-gold'
                                : 'text-primary dark:text-pale-gold'
                            }`}
                          >
                            {service.kicker}
                          </span>
                          {isAcademic ? (
                            <GraduationCap
                              className="w-6 h-6 text-primary-gold shrink-0"
                              strokeWidth={1.6}
                            />
                          ) : (
                            <Briefcase
                              className="w-6 h-6 text-primary dark:text-pale-gold shrink-0"
                              strokeWidth={1.6}
                            />
                          )}
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl text-primary dark:text-white font-semibold">
                          {service.title}
                        </h3>
                        <p className="text-sm font-medium text-primary-gold dark:text-pale-gold mt-1.5 mb-4">
                          {service.subtitle}
                        </p>
                        <p className="text-charcoal/85 dark:text-[#E9E6DF]/80 text-sm leading-relaxed mb-6">
                          {service.description}
                        </p>

                        <div className="pt-6 border-t border-soft-stone dark:border-white/10">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-grey dark:text-[#E9E6DF]/65 mb-3">
                            Key Focus Areas
                          </h4>
                          <ul className="space-y-2.5">
                            {service.focusAreas.map((area) => (
                              <li
                                key={area}
                                className="flex items-start text-sm text-charcoal dark:text-[#E9E6DF]"
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full mt-2 mr-3 shrink-0 ${
                                    isAcademic
                                      ? 'bg-primary-gold'
                                      : 'bg-primary dark:bg-pale-gold'
                                  }`}
                                />
                                <span>{area}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-soft-stone dark:border-white/10">
                        <button
                          type="button"
                          onClick={() => setBriefModalDivision(service.id)}
                          className="group min-h-[44px] inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-pale-gold hover:text-primary-gold dark:hover:text-white transition-colors cursor-pointer"
                        >
                          <span>{service.ctaLabel}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Why Quillovate / Foundation Section */}
          <section
            id="why-quillovate"
            className="py-16 sm:py-20 lg:py-24 bg-warm-ivory dark:bg-[#081220] border-b border-soft-stone dark:border-white/5"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
              <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary-gold dark:text-pale-gold block mb-2">
                  Our Foundation
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-primary dark:text-white font-semibold tracking-tight">
                  More than writing. A considered approach to every project.
                </h2>
                <p className="text-sm sm:text-base text-muted-grey dark:text-[#E9E6DF]/75 mt-3">
                  The principles that guide our intellectual rigor and collaborative partnerships.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {FOUNDATION_PRINCIPLES.map((item) => (
                  <div
                    key={item.number}
                    className="p-6 bg-white dark:bg-[#0c1829] border border-soft-stone dark:border-white/10 rounded-sm"
                  >
                    <span className="font-serif text-4xl text-primary-gold/45 dark:text-pale-gold/35 font-bold block mb-4 tabular-nums">
                      {item.number}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-primary dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-charcoal/80 dark:text-[#E9E6DF]/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Our Approach / Methodology Section */}
          <section
            id="approach"
            className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-background-dark border-b border-soft-stone dark:border-white/5"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
              <div className="max-w-3xl mb-12 sm:mb-16">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary-gold dark:text-pale-gold block mb-2">
                  Methodology
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-primary dark:text-white font-semibold tracking-tight">
                  From initial idea to finished work.
                </h2>
                <p className="text-sm sm:text-base text-muted-grey dark:text-[#E9E6DF]/75 mt-3">
                  A clear, four-stage engagement pathway ensuring clarity, predictability, and excellence.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {APPROACH_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="p-6 bg-warm-ivory dark:bg-[#0e1a2b] border border-soft-stone dark:border-white/10 rounded-sm"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary text-white dark:bg-primary-gold flex items-center justify-center text-xs font-bold font-mono tabular-nums mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-primary dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-xs text-charcoal/80 dark:text-[#E9E6DF]/75 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quillovate Sessions Section */}
          <section
            id="sessions"
            className="py-16 sm:py-20 lg:py-24 bg-soft-stone/50 dark:bg-[#081220] border-b border-soft-stone dark:border-white/5"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <div className="lg:col-span-6">
                  <div className="relative overflow-hidden rounded-sm border border-soft-stone dark:border-white/10 shadow-md">
                    <ResilientImage
                      src={SESSIONS_IMAGE_URL}
                      alt="Quillovate Sessions intellectual salon discussion"
                      fallbackTitle="Quillovate Sessions · Dialogues in Scholarship"
                      className="w-full h-[280px] sm:h-[380px] lg:h-[420px] object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary/90 text-pale-gold text-xs px-3 py-1 font-semibold uppercase tracking-wider backdrop-blur-sm">
                      Dialogues in Scholarship
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 flex flex-col justify-center">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary-gold dark:text-pale-gold mb-2 block">
                    Intellectual Exchange
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-primary dark:text-white font-semibold tracking-tight">
                    Conversations about writing, research and ideas.
                  </h2>
                  <p className="text-sm sm:text-base text-charcoal/90 dark:text-[#E9E6DF]/90 leading-relaxed mt-5">
                    Quillovate Sessions is our dedicated video platform for conversations and in-depth discussions with experienced scholars, practitioners, and leaders navigating the craft of research and communication.
                  </p>

                  <div className="mt-6 space-y-3.5">
                    <div className="flex items-start gap-3">
                      <MessageSquare
                        className="w-5 h-5 text-primary-gold shrink-0 mt-0.5"
                        strokeWidth={1.6}
                      />
                      <p className="text-sm text-muted-grey dark:text-[#E9E6DF]/75">
                        Salon dialogues bridging conceptual complexity with communicative reach.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <BookOpen
                        className="w-5 h-5 text-primary-gold shrink-0 mt-0.5"
                        strokeWidth={1.6}
                      />
                      <p className="text-sm text-muted-grey dark:text-[#E9E6DF]/75">
                        Recorded YouTube sessions unpacking manuscript architecture and publishing standards.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={openSessionsPage}
                      className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 bg-primary text-white dark:bg-primary-gold dark:hover:bg-pale-gold dark:hover:text-primary text-sm font-medium tracking-wide rounded-sm hover:bg-primary-gold transition-colors cursor-pointer"
                    >
                      <span>Explore Quillovate Sessions</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-grey dark:text-[#E9E6DF]/55 mt-4 italic">
                    * Browse recorded sessions by category, publication date, and views.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Insights Section */}
          <section
            id="insights"
            className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-background-dark border-b border-soft-stone dark:border-white/5"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary-gold dark:text-pale-gold block mb-2">
                    Perspectives &amp; Essays
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-primary dark:text-white font-semibold tracking-tight">
                    Ideas, perspectives and practical insights.
                  </h2>
                  <p className="text-sm sm:text-base text-muted-grey dark:text-[#E9E6DF]/75 mt-3 max-w-2xl">
                    Articles and useful perspectives on academic development, research methodologies, editorial standards, and professional communication.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveArticle(INSIGHT_ARTICLES[0])}
                  className="min-h-[44px] inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-pale-gold hover:text-primary-gold transition-colors cursor-pointer self-start md:self-auto shrink-0"
                >
                  <span>Explore Insights</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {INSIGHT_ARTICLES.map((article) => (
                  <article
                    key={article.id}
                    className="p-6 sm:p-8 bg-warm-ivory dark:bg-[#0c1829] border border-soft-stone dark:border-white/10 rounded-sm flex flex-col justify-between group hover:border-primary-gold/50 transition-colors"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-grey dark:text-[#E9E6DF]/65 mb-4">
                        <span className="uppercase tracking-wider font-semibold text-primary-gold dark:text-pale-gold">
                          {article.category}
                        </span>
                        <span>
                          {article.publishedLabel} · {article.readTime}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-primary dark:text-white group-hover:text-primary-gold transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-charcoal/75 dark:text-[#E9E6DF]/75 mt-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-soft-stone dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setActiveArticle(article)}
                        className="min-h-[40px] text-xs font-semibold text-primary dark:text-pale-gold hover:text-primary-gold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Read perspective</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section (Video + Written Reflections) */}
          <section
            id="testimonials"
            className="py-16 sm:py-20 lg:py-24 bg-warm-ivory dark:bg-[#081220] border-b border-soft-stone dark:border-white/5"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
                <div className="max-w-3xl">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary-gold dark:text-pale-gold block mb-2">
                    Reputation &amp; Trust
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-primary dark:text-white font-semibold tracking-tight">
                    Trusted by Clients. Built on Experience.
                  </h2>
                  <p className="text-sm sm:text-base text-muted-grey dark:text-[#E9E6DF]/75 mt-3">
                    Watch recorded video reflections or read written notes from individuals and institutions who have worked with our founding team.
                  </p>
                </div>

                {/* Format Switch: All | Video | Written */}
                <div
                  role="tablist"
                  aria-label="Filter testimonials by format"
                  className="inline-flex items-center gap-1 p-1 bg-soft-stone/70 dark:bg-[#0e1a2b] border border-soft-stone dark:border-white/10 rounded-sm self-start lg:self-auto shrink-0"
                >
                  {(
                    [
                      { id: 'all', label: 'All Reflections' },
                      { id: 'video', label: 'Video Testimonials' },
                      { id: 'text', label: 'Written Reflections' },
                    ] as const
                  ).map((tab) => {
                    const active = testimonialFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setTestimonialFilter(tab.id)}
                        className={`min-h-[38px] px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-primary text-white dark:bg-primary-gold'
                            : 'text-charcoal/80 dark:text-[#E9E6DF]/75 hover:text-primary dark:hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map((item) =>
                  item.kind === 'video' ? (
                    <div
                      key={item.id}
                      className="p-5 sm:p-6 bg-white dark:bg-[#0e1a2b] border border-soft-stone dark:border-white/10 rounded-sm flex flex-col justify-between shadow-sm"
                    >
                      <div>
                        <YouTubeThumbnailFrame
                          title={item.videoTitle ?? item.role}
                          subtitle={`${item.speakerName ?? item.role} · ${item.engagementContext}`}
                          duration={item.videoDuration ?? '02:00'}
                          category="Client Video"
                          onPlay={() => setActiveTestimonialVideo(item)}
                        />
                        <p className="font-serif italic text-charcoal dark:text-[#E9E6DF] text-sm leading-relaxed mt-5 mb-5">
                          {item.quote}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-soft-stone dark:border-white/10 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold text-primary dark:text-pale-gold">
                            {item.speakerName ?? item.role}
                          </p>
                          <span className="text-xs text-muted-grey dark:text-[#E9E6DF]/65">
                            {item.role} · {item.videoViews}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTestimonialVideo(item)}
                          className="min-h-[36px] text-xs font-semibold text-primary dark:text-pale-gold hover:text-primary-gold transition-colors cursor-pointer shrink-0"
                        >
                          Watch
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={item.id}
                      className={`p-6 sm:p-8 bg-white dark:bg-[#0e1a2b] border border-soft-stone dark:border-white/10 rounded-sm flex flex-col justify-between shadow-sm ${
                        item.wide && testimonialFilter === 'all'
                          ? 'md:col-span-2 lg:col-span-2'
                          : ''
                      }`}
                    >
                      <div>
                        <p className="font-serif italic text-charcoal dark:text-[#E9E6DF] text-sm sm:text-base leading-relaxed mb-6">
                          {item.quote}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-soft-stone dark:border-white/10">
                        <p className="text-xs font-semibold text-primary dark:text-pale-gold">
                          {item.role}
                        </p>
                        <span className="text-xs text-muted-grey dark:text-[#E9E6DF]/65">
                          {item.engagementContext}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Primary Conversion CTA Section */}
          <section
            id="cta"
            className="py-16 sm:py-20 lg:py-24 bg-primary text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute -right-20 -bottom-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full border-[36px] sm:border-[40px] border-primary-gold" />
              <div className="absolute -left-20 -top-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full border-[36px] sm:border-[40px] border-white" />
            </div>
            <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center relative z-10">
              <div className="w-12 h-0.5 bg-primary-gold mx-auto mb-6" />
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                Have an idea or project that needs the right words?
              </h2>
              <p className="text-base sm:text-lg text-warm-ivory/85 leading-relaxed max-w-2xl mx-auto mt-6">
                Whether you need support with an academic assignment, a research monograph, or a professional document, we&apos;d be glad to understand what you&apos;re working on.
              </p>

              <div className="mt-9 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3.5 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setBriefModalDivision('academic')}
                  className="min-h-[44px] inline-flex items-center justify-center bg-primary-gold text-white px-8 py-3.5 text-sm font-medium tracking-wide rounded-sm hover:bg-pale-gold hover:text-primary transition-all duration-200 shadow-md cursor-pointer"
                >
                  Start a Project
                </button>
                <a
                  href={CONTACT_MAILTO}
                  className="min-h-[44px] inline-flex items-center justify-center border border-white/40 text-white px-8 py-3.5 text-sm font-medium tracking-wide rounded-sm hover:border-primary-gold hover:text-primary-gold transition-all duration-200"
                >
                  Contact Us
                </a>
              </div>
              <p className="text-xs text-warm-ivory/65 mt-8 tracking-wider uppercase">
                Confidentiality &amp; Intellectual Property Strictly Protected
              </p>
            </div>
          </section>
        </>
      )}

      {/* Footer (White-and-Gold Quillovate logo directly on dark navy background) */}
      <footer
        id="contact"
        className="bg-[#01142B] text-white/75 py-14 sm:py-16 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-white/10">
            <div className="sm:col-span-2 md:col-span-5">
              <div className="mb-4">
                <img
                  src={LOGO_DARK_SRC}
                  alt="Quillovate"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-xs text-white/65 leading-relaxed max-w-sm">
                Professional writing, research support and editorial consultancy helping academics, professionals and institutions communicate with precision and authority.
              </p>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-xs uppercase font-bold tracking-widest text-pale-gold mb-4">
                Divisions
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToHomeSection('#services');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Academic Services
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToHomeSection('#services');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Professional Services
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={openSessionsPage}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Quillovate Sessions
                  </button>
                </li>
                <li>
                  <a
                    href="#insights"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToHomeSection('#insights');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Perspectives &amp; Insights
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-xs uppercase font-bold tracking-widest text-pale-gold mb-4">
                Firm
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a
                    href="#approach"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToHomeSection('#approach');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Our Approach
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToHomeSection('#testimonials');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Client Reflections
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openPolicy('editorial-code')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Editorial Code
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openPolicy('privacy-notice')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Privacy Notice
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-xs uppercase font-bold tracking-widest text-pale-gold mb-4">
                Consultation Inquiries
              </h4>
              <p className="text-xs text-white/65 mb-2">
                Submissions &amp; project briefs:
              </p>
              <a
                href={CONTACT_MAILTO}
                className="text-xs text-white font-medium hover:text-pale-gold transition-colors break-all"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="text-xs text-white/45 mt-4 leading-relaxed">
                London · Global Remote Advisory
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
            <p className="text-center sm:text-left">
              &copy; 2027 Quillovate Editorial Consultancy. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
              <button
                type="button"
                onClick={() => openPolicy('terms-of-engagement')}
                className="hover:text-white/80 transition-colors cursor-pointer"
              >
                Terms of Engagement
              </button>
              <button
                type="button"
                onClick={() => openPolicy('intellectual-property')}
                className="hover:text-white/80 transition-colors cursor-pointer"
              >
                Intellectual Property
              </button>
              <button
                type="button"
                onClick={() => openPolicy('ethics-policy')}
                className="hover:text-white/80 transition-colors cursor-pointer"
              >
                Ethics Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      {briefModalDivision && (
        <ProjectBriefModal
          initialDivision={briefModalDivision}
          onClose={() => setBriefModalDivision(null)}
        />
      )}

      {activeArticle && (
        <ArticleModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
          onStartProject={() => setBriefModalDivision('academic')}
        />
      )}

      {activeSessionVideo && (
        <SessionPlayerModal
          session={activeSessionVideo}
          onClose={() => setActiveSessionVideo(null)}
        />
      )}

      {activeTestimonialVideo && (
        <TestimonialVideoModal
          testimonial={activeTestimonialVideo}
          onClose={() => setActiveTestimonialVideo(null)}
        />
      )}

      {activePolicy && (
        <PolicyModal
          policy={activePolicy}
          onClose={() => setActivePolicy(null)}
        />
      )}
    </div>
  );
}
