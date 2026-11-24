import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X, ArrowRight } from 'lucide-react';
import { LOGO_DARK_SRC, LOGO_LIGHT_SRC, NAV_LINKS } from '../data/quillovateData';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onStartProject: () => void;
  onNavigateSection: (href: string) => void;
  onOpenSessionsPage: () => void;
  currentView: 'home' | 'sessions';
}

export function Navbar({
  isDark,
  onToggleTheme,
  onStartProject,
  onNavigateSection,
  onOpenSessionsPage,
  currentView,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#sessions' && currentView === 'sessions') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onNavigateSection(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F7F5F0]/95 dark:bg-[#022146]/95 backdrop-blur-md border-b border-soft-stone dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Logo (switches seamlessly between Navy/Gold and White/Gold) */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            onNavigateSection('#top');
          }}
          className="flex items-center shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-gold"
          aria-label="Quillovate Home"
        >
          <img
            src={LOGO_LIGHT_SRC}
            alt="Quillovate"
            className="h-9 sm:h-11 w-auto object-contain block dark:hidden"
          />
          <img
            src={LOGO_DARK_SRC}
            alt="Quillovate"
            className="h-9 sm:h-11 w-auto object-contain hidden dark:block"
          />
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide"
        >
          {NAV_LINKS.map((link) => {
            const isSessionsActive =
              currentView === 'sessions' && link.href === '#sessions';
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (link.href === '#sessions' && currentView === 'home') {
                    onNavigateSection('#sessions');
                  } else if (link.href === '#sessions' && currentView === 'sessions') {
                    onOpenSessionsPage();
                  } else {
                    handleLinkClick(link.href);
                  }
                }}
                className={`whitespace-nowrap shrink-0 transition-colors duration-150 py-1 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:bg-primary-gold after:transition-all after:duration-200 ${
                  isSessionsActive
                    ? 'text-primary-gold dark:text-pale-gold after:w-full'
                    : 'text-charcoal hover:text-primary-gold dark:text-[#E9E6DF] dark:hover:text-pale-gold after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle, Primary Action & Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-charcoal/80 hover:text-primary dark:text-[#E9E6DF]/80 dark:hover:text-pale-gold rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-gold cursor-pointer"
          >
            {isDark ? (
              <Sun className="w-5 h-5" strokeWidth={1.75} />
            ) : (
              <Moon className="w-5 h-5" strokeWidth={1.75} />
            )}
          </button>

          <button
            type="button"
            onClick={onStartProject}
            className="hidden sm:inline-flex items-center justify-center whitespace-nowrap shrink-0 px-5 py-2.5 min-h-[44px] bg-primary dark:bg-primary-gold text-white text-xs uppercase tracking-widest font-semibold hover:bg-primary-gold dark:hover:bg-pale-gold dark:hover:text-primary transition-colors duration-200 shadow-sm rounded-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-gold"
          >
            Start a Project
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-primary dark:text-[#F7F5F0] hover:text-primary-gold dark:hover:text-pale-gold rounded-sm border border-soft-stone dark:border-white/15 bg-white/60 dark:bg-white/5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-gold"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={1.75} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-primary/40 dark:bg-black/60 backdrop-blur-[2px] z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="mobile-navigation-drawer"
            aria-label="Mobile Navigation"
            className="lg:hidden absolute inset-x-0 top-full z-50 bg-warm-ivory dark:bg-[#081220] border-b border-soft-stone dark:border-white/15 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="min-h-[48px] flex items-center justify-between text-base font-medium text-primary dark:text-[#E9E6DF] hover:text-primary-gold dark:hover:text-pale-gold border-b border-soft-stone/80 dark:border-white/10 transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-primary-gold/80" />
                </a>
              ))}

              <div className="pt-5 pb-3 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStartProject();
                  }}
                  className="w-full min-h-[48px] inline-flex items-center justify-center px-6 py-3 bg-primary dark:bg-primary-gold text-white text-xs uppercase tracking-widest font-semibold hover:bg-primary-gold dark:hover:bg-pale-gold dark:hover:text-primary transition-colors rounded-sm shadow-sm cursor-pointer"
                >
                  Start a Project
                </button>
                <p className="text-xs text-center text-muted-grey dark:text-[#E9E6DF]/60">
                  Academic &amp; Professional Editorial Consultancy
                </p>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
