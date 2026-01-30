'use client';

import { AnimatedItem, AnimatedSection } from '@/components/ui/AnimatedSection';
import { BerylButton } from '@/components/ui/BerylButton';
import { GlassCard, GlassCardContent } from '@/components/ui/GlassCard';
import { GradientText, TechLabel } from '@/components/ui/GradientText';
import {
    ArrowRight,
    Bot,
    Brain,
    Workflow,
    type LucideIcon
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// 🤖 AI SERVICES SECTION
// Showcases AI agency capabilities with glassmorphism cards
// ═══════════════════════════════════════════════════════════════════════════

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  technologies: string[];
  featured?: boolean;
}

const services: Service[] = [
  {
    id: 'llm-integration',
    icon: Brain,
    title: 'LLM Integration',
    description: 'Custom AI solutions powered by GPT-4, Claude, and open-source models. Seamless API integration with your existing infrastructure.',
    technologies: ['OpenAI', 'Anthropic', 'LangChain', 'Vector DBs'],
    featured: true,
  },
  {
    id: 'ai-agents',
    icon: Bot,
    title: 'AI Agents & Automation',
    description: 'Intelligent autonomous agents that handle complex workflows, customer support, and business processes 24/7.',
    technologies: ['AutoGPT', 'CrewAI', 'Custom Agents'],
  },
  {
    id: 'ai-software-dev',
    icon: Workflow,
    title: 'AI Integrated Software Development',
    description: 'Full-stack software development with AI capabilities built-in. From intelligent features to automated workflows, we build modern applications that leverage the power of AI.',
    technologies: ['Next.js', 'Node.js', 'Python', 'OpenAI API', 'LangChain'],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// 🃏 SERVICE CARD
// ═══════════════════════════════════════════════════════════════════════════

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <AnimatedItem animation="fade-up-blur">
      <GlassCard
        variant={service.featured ? 'glow' : 'default'}
        hoverGlow
        hoverLift
        padding="lg"
        className="h-full group cursor-pointer"
      >
        {/* Icon */}
        <div className="mb-6 relative">
          <div 
            className={`
              w-14 h-14 rounded-xl flex items-center justify-center
              ${service.featured 
                ? 'bg-gradient-to-br from-beryl-cyan/20 to-beryl-green/20 border border-beryl-cyan/30' 
                : 'bg-void-200/50 border border-white/10'
              }
              group-hover:border-beryl-cyan/40 transition-colors duration-300
            `}
          >
            <Icon 
              className={`w-7 h-7 ${
                service.featured ? 'text-beryl-cyan' : 'text-white/70 group-hover:text-beryl-cyan'
              } transition-colors duration-300`}
            />
          </div>

          {/* Featured badge */}
          {service.featured && (
            <div className="absolute -top-2 -right-2">
              <span className="px-2 py-0.5 text-[0.6rem] font-mono uppercase tracking-wider bg-beryl-gradient text-void rounded-full">
                Popular
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-beryl-cyan transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <GlassCardContent className="mb-6">
          <p className="text-white/60 leading-relaxed">
            {service.description}
          </p>
        </GlassCardContent>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-wider 
                         bg-void-200/50 text-white/50 rounded-md border border-white/5
                         group-hover:border-beryl-cyan/20 group-hover:text-white/70
                         transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Learn more link */}
        <div className="pt-4 border-t border-white/5">
          <span className="inline-flex items-center gap-2 text-sm text-white/40 group-hover:text-beryl-cyan transition-colors duration-300">
            Learn more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </GlassCard>
    </AnimatedItem>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 📦 MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export function Services() {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="hero-glow opacity-30" />
      <div className="violet-glow" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <AnimatedSection animation="fade-up-blur" className="text-center mb-16">
          {/* Label */}
          <TechLabel variant="beryl" className="mb-4 block">
            What I Build
          </TechLabel>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <GradientText gradient="beryl" as="span">
              AI-Powered
            </GradientText>
            <br />
            <span className="text-white">Solutions</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Cutting-edge artificial intelligence services designed to transform your business 
            operations and unlock new possibilities.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <AnimatedSection 
          stagger 
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection 
          animation="fade-up-blur" 
          delay={0.6}
          className="text-center mt-16"
        >
          <GlassCard variant="bordered" padding="lg" className="inline-block">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-left">
                <p className="text-white font-medium mb-1">
                  Have a unique project in mind?
                </p>
                <p className="text-white/50 text-sm">
                  Let&apos;s discuss how AI can solve your specific challenges.
                </p>
              </div>
              <BerylButton
                variant="primary"
                size="lg"
                rounded="full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start a Conversation
              </BerylButton>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default Services;
