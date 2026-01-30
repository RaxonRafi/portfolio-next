'use client';

import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { BerylButton } from '@/components/ui/BerylButton';
import { GradientText } from '@/components/ui/GradientText';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ChevronRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// 🧭 GLASSMORPHISM NAVBAR
// Premium navigation with Neo-Terminal design system
// ═══════════════════════════════════════════════════════════════════════════

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const { scrollTo } = useSmoothScroll();
  const { scrollY } = useScroll();

  // Track scroll position
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  // Track active section
  useEffect(() => {
    // Check if we're on the homepage
    const isHomePage = window.location.pathname === '/';
    
    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    // Get all sections with IDs
    const sections = document.querySelectorAll('section[id]');
    
    // Set initial active section based on scroll position
    const setInitialActiveSection = () => {
      const scrollPosition = window.scrollY + 150; // Account for navbar height
      
      let currentSection = 'home';
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };

    // Set initial section
    setInitialActiveSection();

    // Create intersection observer with better settings
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { 
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5], // Multiple thresholds for better detection
        rootMargin: '-80px 0px -40% 0px' // Account for navbar
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Also listen to scroll events as backup
    const handleScroll = () => {
      setInitialActiveSection();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    // Check if we're on the homepage
    const isHomePage = window.location.pathname === '/';
    
    if (href === '/') {
      // Navigate to home
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/');
      }
    } else if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '');
      
      if (isHomePage) {
        // We're on home page, just scroll
        scrollTo(`#${sectionId}`);
      } else {
        // We're on another page, navigate to home then scroll
        router.push(href);
      }
    } else {
      // Regular link
      router.push(href);
    }
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-500',
          scrolled
            ? 'py-3'
            : 'py-5'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glass background */}
        <motion.div
          className={cn(
            'absolute inset-0 transition-all duration-500',
            scrolled
              ? 'bg-[#121212]/80 backdrop-blur-xl border-b border-white/[0.08]'
              : 'bg-transparent'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
        />

        <div className="container mx-auto px-6 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span 
                  className="text-xl font-medium tracking-tight font-mono"
                >
                  <span className="text-white/90">M</span>
                  <GradientText gradient="beryl" className="font-normal">
                    .Rafi
                  </GradientText>
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                // Get section ID from href
                let sectionId = '';
                if (link.href === '/') {
                  sectionId = 'home';
                } else if (link.href.startsWith('/#')) {
                  sectionId = link.href.replace('/#', '');
                }
                
                // Check if this link is active
                const isActive = activeSection === sectionId || 
                  (link.href === '/' && (activeSection === 'home' || activeSection === ''));

                return (
                  <motion.button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium transition-colors duration-300',
                      isActive 
                        ? 'text-[#8A2BE2]' 
                        : 'text-white/60 hover:text-white'
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-[#8A2BE2]/10 rounded-lg border border-[#8A2BE2]/20"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="hidden lg:flex items-center gap-4">
              {isLoading ? (
                <div className="w-24 h-9 bg-void-200/50 animate-pulse rounded-lg" />
              ) : isAuthenticated ? (
                <Link href="/dashboard">
                  <BerylButton variant="ghost" size="sm">
                    Dashboard
                  </BerylButton>
                </Link>
              ) : (
                <BerylButton
                  variant="primary"
                  size="sm"
                  rounded="full"
                  onClick={() => handleNavClick('/#contact')}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Let&apos;s Talk
                </BerylButton>
              )}
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-lg bg-void-200/50 border border-white/10"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#121212]/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu content */}
            <motion.nav
              className="absolute inset-x-0 top-20 p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
            >
              <div className="glass-card rounded-2xl p-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full flex items-center justify-between p-4 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <span className="text-lg">{link.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  className="pt-4 mt-4 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {isAuthenticated ? (
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <BerylButton variant="primary" fullWidth>
                        Dashboard
                      </BerylButton>
                    </Link>
                  ) : (
                    <BerylButton
                      variant="primary"
                      fullWidth
                      rounded="full"
                      onClick={() => handleNavClick('/#contact')}
                    >
                      Let&apos;s Talk
                    </BerylButton>
                  )}
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
