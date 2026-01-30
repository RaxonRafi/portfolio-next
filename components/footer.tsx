'use client';

import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { GradientText } from '@/components/ui/GradientText';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';

// ═══════════════════════════════════════════════════════════════════════════
// 🦶 FOOTER COMPONENT
// Premium footer with Neo-Terminal styling
// ═══════════════════════════════════════════════════════════════════════════

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/raxonRafi', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/md-mashruul-islam/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/RaxonRafi', label: 'Twitter' },
  { icon: Mail, href: 'mailto:dev.muhammad.rafi@gmail.com', label: 'Email' },
];

export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  const scrollToTop = () => {
    scrollTo(0, { duration: 1.5 });
  };

  const handleNavClick = (href: string) => {
    scrollTo(href);
  };

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8A2BE2]/30 to-transparent" />
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8A2BE2]/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <Link href="/" className="inline-block mb-4">
              <h3 
                className="text-3xl font-normal font-mono"
              >
                <span className="text-white/90">Muhammad</span>{' '}
                <GradientText gradient="beryl">Rafi</GradientText>
              </h3>
            </Link>
            <p className="text-white/40 text-sm max-w-xs">
              Building exceptional digital experiences with AI, clean code, and modern technologies.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-white/40 hover:text-[#8A2BE2] text-sm transition-colors duration-300 font-mono"
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.button>
            ))}
          </motion.nav>

          {/* Social & Back to top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-6"
          >
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#1a1a1a]/50 border border-white/5 flex items-center justify-center text-white/40 hover:text-[#8A2BE2] hover:border-[#8A2BE2]/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-white/10" />

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg border border-[#8A2BE2]/30 bg-[#8A2BE2]/10 flex items-center justify-center text-[#8A2BE2] hover:bg-[#8A2BE2]/20 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-center"
        >
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Muhammad Rafi. All rights reserved.
          </p>

        </motion.div>
      </div>
    </footer>
  );
}
