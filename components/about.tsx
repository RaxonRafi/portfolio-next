'use client';

import { AnimatedItem, AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowingText, GradientText, TechLabel } from '@/components/ui/GradientText';
import { motion } from 'framer-motion';
import { Brain, Code, Rocket } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// 👤 ABOUT SECTION
// Enhanced with Neo-Terminal glassmorphism and animations
// ═══════════════════════════════════════════════════════════════════════════

const features = [
  {
    icon: Code,
    title: 'Clean Code',
    description: 'I write maintainable, scalable, and efficient code following best practices and industry standards.',
    gradient: 'beryl',
  },
  {
    icon: Brain,
    title: 'AI-First Mindset',
    description: 'Leveraging cutting-edge AI tools and technologies to build smarter, more efficient solutions.',
    gradient: 'violet',
  },
  {
    icon: Rocket,
    title: 'Fast Learner',
    description: 'I quickly adapt to new technologies and environments, constantly expanding my skill set.',
    gradient: 'beryl',
  },
];

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '20+', label: 'Happy Clients' },
  { value: '10+', label: 'Technologies' },
];

export default function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8A2BE2]/20 to-transparent" />
      <div className="violet-glow opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <AnimatedSection animation="fade-up-blur" className="max-w-3xl mb-20">
          <TechLabel variant="beryl" className="mb-4 block">
            01 — About
          </TechLabel>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 font-mono"
          >
            A Passionate{' '}
            <GradientText gradient="beryl" glow>
              Software Engineer
            </GradientText>
          </h2>
          
          <p className="text-lg text-white/50 leading-relaxed">
            I&apos;m a Software Engineer with a passion for creating clean, efficient, and user-friendly applications. 
            My journey began in college where I discovered my love for solving complex problems through code.
            Today, I specialize in building{' '}
            <GlowingText color="beryl" intensity="low" animated={false}>
              AI-powered
            </GlowingText>
            {' '}solutions that transform businesses.
          </p>
        </AnimatedSection>

        {/* Feature Cards Grid */}
        <AnimatedSection stagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <AnimatedItem key={index} animation="fade-up-blur">
                <GlassCard
                  variant="default"
                  hoverGlow
                  hoverLift
                  padding="lg"
                  className="h-full group"
                >
                  {/* Icon */}
                  <div
                    className={`
                      w-14 h-14 rounded-xl flex items-center justify-center mb-6
                      ${feature.gradient === 'beryl' 
                        ? 'bg-gradient-to-br from-[#8A2BE2]/20 to-[#7000ff]/20 border border-[#8A2BE2]/30' 
                        : 'bg-gradient-to-br from-violet-500/20 to-violet-400/20 border border-violet-500/30'
                      }
                      group-hover:scale-110 transition-transform duration-300
                    `}
                  >
                    <Icon 
                      className={`w-7 h-7 ${
                        feature.gradient === 'beryl' ? 'text-[#8A2BE2]' : 'text-violet-400'
                      }`} 
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#8A2BE2] transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </AnimatedItem>
            );
          })}
        </AnimatedSection>

        {/* Stats Row */}
        <AnimatedSection animation="fade-up-blur" delay={0.3}>
          <GlassCard variant="subtle" padding="lg" className="overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {/* Divider (except first) */}
                  {index > 0 && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
                  )}
                  
                  <div 
                    className="text-4xl md:text-5xl font-light mb-2 font-mono"
                  >
                    <GradientText gradient="beryl" glow>
                      {stat.value}
                    </GradientText>
                  </div>
                  <div className="text-sm text-white/40 uppercase tracking-wider font-mono">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
