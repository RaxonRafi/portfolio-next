'use client';

import { AnimatedItem, AnimatedSection } from '@/components/ui/AnimatedSection';
import { GradientText, TechLabel } from '@/components/ui/GradientText';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// 🎴 PROJECT SHOWCASE - NEO-TERMINAL STYLE
// Fetches real projects from API with 3D hover effects
// ═══════════════════════════════════════════════════════════════════════════

interface Project {
  id: number;
  project_title: string;
  desc: string;
  thumbnail: string;
  tech_used: string[];
  key_features: string[];
  git_url: string;
  live_url: string;
  createdAt: string;
  updatedAt: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 3D PROJECT CARD - Neo-Terminal Style
// ═══════════════════════════════════════════════════════════════════════════

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <AnimatedItem animation="fade-up-blur">
      <motion.div
        ref={cardRef}
        className="relative group cursor-pointer"
        style={{
          perspective: 1000,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="relative"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Neo-Terminal Card */}
          <div className="neo-card overflow-hidden h-full">
            {/* Image container */}
            <div className="relative h-56 overflow-hidden">
              {/* Project image */}
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.project_title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div 
                  className="absolute inset-0"
                  style={{ 
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #333d47 100%)' 
                  }}
                />
              )}
              
              {/* Overlay gradient */}
              <div 
                className="absolute inset-0 z-10"
                style={{
                  background: 'linear-gradient(to top, #121212 0%, rgba(18, 18, 18, 0.5) 50%, transparent 100%)'
                }}
              />

              {/* Featured badge for first 2 projects */}
              {index < 2 && (
                <div className="absolute top-4 left-4 z-20">
                  <span 
                    className="px-3 py-1 text-[0.65rem] font-mono uppercase tracking-wider rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #8A2BE2 0%, #7000ff 100%)',
                      color: '#fff'
                    }}
                  >
                    Featured
                  </span>
                </div>
              )}

              {/* Hover overlay with links */}
              <motion.div
                className="absolute inset-0 z-20 flex items-center justify-center gap-4 backdrop-blur-sm"
                style={{ background: 'rgba(18, 18, 18, 0.6)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {project.live_url && (
                  <motion.a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #8A2BE2 0%, #7000ff 100%)',
                      color: '#fff'
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                )}
                {project.git_url && (
                  <motion.a
                    href={project.git_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(26, 26, 26, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff'
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                )}
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 
                className="text-xl font-semibold text-white mb-2 flex items-center gap-2 transition-colors duration-300"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                {project.project_title}
                <ArrowUpRight 
                  className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" 
                  style={{ color: '#8A2BE2' }}
                />
              </h3>

              <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
                {project.desc}
              </p>

              {/* Technologies as skill-tags */}
              <div className="flex flex-wrap gap-2">
                {project.tech_used.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="skill-tag px-2 py-1 text-[0.6rem] font-mono uppercase tracking-wider"
                    style={{ color: '#8A2BE2' }}
                  >
                    {tech}
                  </span>
                ))}
                {project.tech_used.length > 4 && (
                  <span
                    className="skill-tag px-2 py-1 text-[0.6rem] font-mono uppercase tracking-wider"
                    style={{ color: '#8A2BE2' }}
                  >
                    +{project.tech_used.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* 3D Shine effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${50 + mouseX.get() * 50}% ${50 + mouseY.get() * 50}%, rgba(138, 43, 226, 0.1), transparent 50%)`,
              }}
            />
          </div>
        </motion.div>

        {/* 3D Shadow - Purple glow */}
        <motion.div
          className="absolute -inset-4 -z-10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(138, 43, 226, 0.15), transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </motion.div>
    </AnimatedItem>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 📦 MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

interface ProjectShowcaseProps {
  showAll?: boolean;
}

export function ProjectShowcase({ showAll = false }: ProjectShowcaseProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_API ||
          "https://muhammadrafi-portfolio-backend.vercel.app/api/v1";
        const res = await fetch(`${baseUrl}/project`, {
          next: { revalidate: 60 },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status}`);
        }

        const data = await res.json();
        const projectList = Array.isArray(data) ? data : data.data || [];
        setProjects(projectList);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section 
      id="projects" 
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: '#121212' }}
    >
      {/* Background effects */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(138, 43, 226, 0.2), transparent)'
        }}
      />
      <div className="hero-glow opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <AnimatedSection animation="fade-up-blur" className="max-w-3xl mb-16">
          <TechLabel variant="beryl" className="mb-4 block">
            03 — Projects
          </TechLabel>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 font-mono"
          >
            Featured{' '}
            <GradientText gradient="beryl" glow>
              Work
            </GradientText>
          </h2>
          
          <p className="text-lg text-white/50 leading-relaxed">
            A selection of projects that showcase my expertise in full-stack development, 
            AI integration, and creating exceptional user experiences.
          </p>
        </AnimatedSection>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div 
              className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mb-4"
              style={{ borderColor: '#8A2BE2', borderTopColor: 'transparent' }}
            />
            <p className="text-white/50 font-mono">Loading projects...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-400 font-mono">{error}</p>
          </div>
        )}

        {/* No projects state */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/50 font-mono">No projects available at the moment.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && projects.length > 0 && (
          <AnimatedSection 
            stagger 
            staggerDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatedSection>
        )}

        {/* View all button */}
        {!showAll && projects.length > 4 && !loading && (
          <AnimatedSection animation="fade-up-blur" delay={0.5} className="text-center mt-12">
            <a 
              href="/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-button px-8 py-4 font-mono text-lg inline-flex items-center gap-2"
              style={{ color: '#8A2BE2' }}
            >
              View All Projects
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

export default ProjectShowcase;
