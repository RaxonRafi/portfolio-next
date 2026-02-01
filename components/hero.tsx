'use client';

import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// 🚀 HERO SECTION
// Neo-Terminal style hero - EXACT CLONE from template
// ═══════════════════════════════════════════════════════════════════════════

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const { scrollTo } = useSmoothScroll();
  const fullText = 'System initializing...';

  // Typing animation effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.substring(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (sectionId: string) => {
    scrollTo(`#${sectionId}`);
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{ backgroundColor: '#121212' }}
    >
      {/* Background radial glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(138, 43, 226, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(138, 43, 226, 0.02) 0%, transparent 50%)
          `
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 pt-16 sm:pt-20 md:pt-28 px-4">
        {/* Main Title with Atmospheric Glow */}
        <motion.div 
          className="mb-6 sm:mb-8 atmospheric-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-mono mb-3 sm:mb-4 glow-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            MUHAMMAD RAFI
          </h1>
          <h2 className="font-mono mb-3 sm:mb-4 text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed">
            SOFTWARE ENGINEER | AI ENTHUSIAST
          </h2>
          <div className="inline-block">
            <p className="font-mono text-sm sm:text-base md:text-lg" style={{ color: '#8A2BE2' }}>
              {displayText}
              <span className="animate-blink">_</span>
            </p>
          </div>
        </motion.div>
        
        {/* Neo Terminal Code Window */}
        <motion.div 
          className="mb-8 sm:mb-12 neo-card p-4 sm:p-6 md:p-8 max-w-2xl mx-auto float-animation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-3 sm:mb-4">
            <span className="font-mono text-xs sm:text-sm opacity-60" style={{ color: '#8A2BE2' }}>
              // Integrated Development Environment
            </span>
          </div>
          <pre className="font-mono text-left text-xs sm:text-sm md:text-base overflow-x-auto" style={{ color: '#8A2BE2' }}>
{`> System.out.println("Building Digital Experiences");
> console.log("React, Next.js, TypeScript");  
> print("AI/ML Integration Specialist");
> echo "Ready to innovate"`}
          </pre>
          <div className="mt-3 sm:mt-4 flex justify-end">
            <div className="flex space-x-1">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/60"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/60"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/60"></div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button 
            onClick={() => handleScrollTo('projects')}
            className="neo-button px-6 sm:px-8 py-3 sm:py-4 font-mono text-base sm:text-lg w-full sm:w-auto"
            style={{ color: '#8A2BE2' }}
          >
            View Projects
          </button>
          <a 
            href="https://drive.google.com/file/d/17XCuJzGaMFim86DKfGu91pEGTBZcWsuo/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-button px-6 sm:px-8 py-3 sm:py-4 font-mono text-base sm:text-lg w-full sm:w-auto text-center"
            style={{ color: '#8A2BE2' }}
          >
            View Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex gap-4 sm:gap-6 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { icon: Github, href: 'https://github.com/raxonRafi', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/md-mashruul-islam/', label: 'LinkedIn' },
            { icon: Twitter, href: 'https://x.com/RaxonRafi', label: 'Twitter' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center neo-button transition-all duration-300"
              style={{ color: '#8A2BE2' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.button
          onClick={() => handleScrollTo('about')}
          className="p-2 transition-colors duration-300"
          style={{ color: 'rgba(138, 43, 226, 0.6)' }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          aria-label="Scroll to about section"
        >
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}
