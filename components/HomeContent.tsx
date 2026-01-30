'use client';

import About from '@/components/about';
import Contact from '@/components/contact';
import ExperienceAndEducation from '@/components/ExperienceAndEducation';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import Services from '@/components/sections/Services';
import TechStack from '@/components/tech-stack';
import Testimonials from '@/components/testimonials';
import dynamic from 'next/dynamic';

// Dynamically import blog page to avoid SSR issues
const BlogPage = dynamic(() => import('@/app/blogs/page'), { ssr: false });

// ═══════════════════════════════════════════════════════════════════════════
// 🏠 HOME CONTENT
// Main portfolio page with all sections
// ═══════════════════════════════════════════════════════════════════════════

export default function HomeContent() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#121212' }}>
      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <ExperienceAndEducation />
          <TechStack />
          <ProjectShowcase />
          <Testimonials />
          <BlogPage />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Global ambient glow - Neo-Terminal purple */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#8a2be2]/[0.04] blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#7000ff]/[0.04] blur-[150px]" />
      </div>
    </div>
  );
}
