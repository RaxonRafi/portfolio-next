'use client';

import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// 🃏 GLASS CARD COMPONENT
// Premium glassmorphism container with Neo-Terminal design system
// ═══════════════════════════════════════════════════════════════════════════

type GlassVariant = 'default' | 'subtle' | 'strong' | 'bordered' | 'glow';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  /** Visual intensity of the glass effect */
  variant?: GlassVariant;
  /** Enable hover glow effect */
  hoverGlow?: boolean;
  /** Enable hover lift animation */
  hoverLift?: boolean;
  /** Enable entrance animation */
  animated?: boolean;
  /** Animation delay in seconds */
  delay?: number;
  /** Padding preset */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Border radius preset */
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  /** Custom glow color (defaults to neo-terminal purple) */
  glowColor?: string;
  /** Children content */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

// Variant styles - Neo-Terminal Purple
const variantStyles: Record<GlassVariant, string> = {
  default: `
    bg-[#1a1a1a]/60 
    backdrop-blur-xl 
    border border-white/[0.08]
    shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05)]
  `,
  subtle: `
    bg-[#1a1a1a]/40 
    backdrop-blur-lg 
    border border-white/[0.05]
    shadow-[0_4px_24px_rgba(0,0,0,0.3)]
  `,
  strong: `
    bg-[#1a1a1a]/80 
    backdrop-blur-2xl 
    border border-white/[0.1]
    shadow-[0_12px_48px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.08)]
  `,
  bordered: `
    bg-[#1a1a1a]/50 
    backdrop-blur-xl 
    border-2 border-[#8A2BE2]/20
    shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(138,43,226,0.1)]
  `,
  glow: `
    bg-[#1a1a1a]/60 
    backdrop-blur-xl 
    border border-[#8A2BE2]/30
    shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(138,43,226,0.15),inset_0_0_20px_rgba(138,43,226,0.05)]
  `,
};

// Padding presets
const paddingStyles: Record<string, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

// Border radius presets
const roundedStyles: Record<string, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
};

// Hover effects
const hoverGlowStyle = `
  transition-all duration-300 ease-smooth
  hover:border-[#8A2BE2]/40 
  hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_30px_rgba(138,43,226,0.2),inset_0_0_20px_rgba(138,43,226,0.05)]
`;

const hoverLiftStyle = `
  transition-transform duration-300 ease-smooth
  hover:-translate-y-1
`;

// Animation variants for Framer Motion
const animationVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      variant = 'default',
      hoverGlow = false,
      hoverLift = false,
      animated = false,
      delay = 0,
      padding = 'md',
      rounded = 'xl',
      glowColor,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Build className
    const cardClassName = cn(
      // Base styles
      'relative overflow-hidden',
      // Variant
      variantStyles[variant],
      // Padding
      paddingStyles[padding],
      // Border radius
      roundedStyles[rounded],
      // Hover effects
      hoverGlow && hoverGlowStyle,
      hoverLift && hoverLiftStyle,
      // Custom className
      className
    );

    // Custom glow color style
    const customStyle = glowColor
      ? {
          ...style,
          '--glow-color': glowColor,
        }
      : style;

    // Animated version
    if (animated) {
      return (
        <motion.div
          ref={ref}
          className={cardClassName}
          style={customStyle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={animationVariants}
          transition={{
            duration: 0.6,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    // Static version
    return (
      <motion.div
        ref={ref}
        className={cardClassName}
        style={customStyle}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

// ═══════════════════════════════════════════════════════════════════════════
// 🎴 GLASS CARD HEADER
// ═══════════════════════════════════════════════════════════════════════════

interface GlassCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCardHeader({ children, className }: GlassCardHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between mb-4 pb-4',
        'border-b border-white/[0.08]',
        className
      )}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 📝 GLASS CARD TITLE
// ═══════════════════════════════════════════════════════════════════════════

interface GlassCardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function GlassCardTitle({
  children,
  className,
  as: Component = 'h3',
}: GlassCardTitleProps) {
  return (
    <Component
      className={cn(
        'text-lg font-semibold text-white tracking-tight',
        className
      )}
    >
      {children}
    </Component>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 📄 GLASS CARD CONTENT
// ═══════════════════════════════════════════════════════════════════════════

interface GlassCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCardContent({ children, className }: GlassCardContentProps) {
  return (
    <div className={cn('text-white/70', className)}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🏷️ GLASS CARD LABEL (Tech Label Style)
// ═══════════════════════════════════════════════════════════════════════════

interface GlassCardLabelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'beryl' | 'violet';
}

export function GlassCardLabel({
  children,
  className,
  variant = 'default',
}: GlassCardLabelProps) {
  const variantClasses = {
    default: 'text-white/50',
    beryl: 'text-[#8A2BE2]',
    violet: 'text-violet-400',
  };

  return (
    <span
      className={cn(
        'font-mono text-[0.65rem] uppercase tracking-[0.15em]',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🦶 GLASS CARD FOOTER
// ═══════════════════════════════════════════════════════════════════════════

interface GlassCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCardFooter({ children, className }: GlassCardFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between mt-4 pt-4',
        'border-t border-white/[0.08]',
        className
      )}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ✨ GLASS CARD GLOW OVERLAY
// Adds animated glow effect to the card
// ═══════════════════════════════════════════════════════════════════════════

interface GlassCardGlowProps {
  color?: 'beryl' | 'violet' | 'white';
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

export function GlassCardGlow({
  color = 'beryl',
  intensity = 'medium',
  animated = false,
}: GlassCardGlowProps) {
  const colorStyles = {
    beryl: 'bg-[#8A2BE2]/20',
    violet: 'bg-violet-500/20',
    white: 'bg-white/10',
  };

  const intensityStyles = {
    low: 'opacity-30 blur-2xl',
    medium: 'opacity-50 blur-3xl',
    high: 'opacity-70 blur-[64px]',
  };

  return (
    <div
      className={cn(
        'absolute -inset-4 rounded-full pointer-events-none',
        colorStyles[color],
        intensityStyles[intensity],
        animated && 'animate-pulse'
      )}
      aria-hidden="true"
    />
  );
}

export default GlassCard;
