'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// 🌈 GRADIENT TEXT COMPONENT
// Animated gradient text with Beryl colors
// ═══════════════════════════════════════════════════════════════════════════

type GradientPreset = 
  | 'beryl'       // Cyan → Green
  | 'violet'      // Violet → Cyan
  | 'white'       // White → Gray
  | 'sunset'      // Pink → Orange
  | 'aurora';     // Green → Blue → Violet

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  /** Gradient preset */
  gradient?: GradientPreset;
  /** Custom gradient (overrides preset) */
  customGradient?: string;
  /** Animate the gradient */
  animated?: boolean;
  /** Animation duration in seconds */
  duration?: number;
  /** Gradient direction in degrees */
  direction?: number;
  /** HTML element to render */
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
  /** Glow effect */
  glow?: boolean;
}

// Gradient presets - Neo-Terminal Purple
const gradientPresets: Record<GradientPreset, string> = {
  beryl: 'linear-gradient(135deg, #8a2be2 0%, #b24bff 50%, #8a2be2 100%)',
  violet: 'linear-gradient(135deg, #7000ff 0%, #8a2be2 50%, #7000ff 100%)',
  white: 'linear-gradient(180deg, #ffffff 0%, #888888 50%, #ffffff 100%)',
  sunset: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff6b6b 100%)',
  aurora: 'linear-gradient(135deg, #b24bff 0%, #8a2be2 33%, #7000ff 66%, #b24bff 100%)',
};

// Static gradient presets (non-animated)
const staticGradientPresets: Record<GradientPreset, string> = {
  beryl: 'linear-gradient(135deg, #8a2be2 0%, #b24bff 100%)',
  violet: 'linear-gradient(135deg, #7000ff 0%, #8a2be2 100%)',
  white: 'linear-gradient(180deg, #ffffff 0%, #888888 100%)',
  sunset: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
  aurora: 'linear-gradient(135deg, #b24bff 0%, #8a2be2 50%, #7000ff 100%)',
};

export function GradientText({
  children,
  className,
  gradient = 'beryl',
  customGradient,
  animated = false,
  duration = 3,
  direction = 135,
  as: Component = 'span',
  glow = false,
}: GradientTextProps) {
  const gradientValue = customGradient || 
    (animated ? gradientPresets[gradient] : staticGradientPresets[gradient]);

  // Adjust gradient with custom direction
  const finalGradient = customGradient || 
    (animated 
      ? gradientPresets[gradient].replace('135deg', `${direction}deg`)
      : staticGradientPresets[gradient].replace('135deg', `${direction}deg`));

  const glowColor = gradient === 'beryl' ? 'rgba(138, 43, 226, 0.5)' 
    : gradient === 'violet' ? 'rgba(112, 0, 255, 0.5)'
    : 'rgba(255, 255, 255, 0.3)';

  const MotionComponent = motion[Component] as typeof motion.span;

  return (
    <MotionComponent
      className={cn(
        'inline-block bg-clip-text text-transparent',
        animated && 'animate-gradient-shift',
        className
      )}
      style={{
        backgroundImage: finalGradient,
        backgroundSize: animated ? '200% auto' : 'auto',
        textShadow: glow ? `0 0 30px ${glowColor}, 0 0 60px ${glowColor}` : undefined,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animationDuration: animated ? `${duration}s` : undefined,
      }}
    >
      {children}
    </MotionComponent>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ✨ SHIMMER TEXT
// Text with shimmer/shine effect
// ═══════════════════════════════════════════════════════════════════════════

interface ShimmerTextProps {
  children: ReactNode;
  className?: string;
  /** Base color */
  baseColor?: string;
  /** Shimmer color */
  shimmerColor?: string;
  /** Animation duration */
  duration?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

export function ShimmerText({
  children,
  className,
  baseColor = '#888888',
  shimmerColor = '#ffffff',
  duration = 2,
  as: Component = 'span',
}: ShimmerTextProps) {
  const MotionComponent = motion[Component] as typeof motion.span;

  return (
    <MotionComponent
      className={cn('inline-block relative', className)}
      style={{
        background: `linear-gradient(
          90deg,
          ${baseColor} 0%,
          ${baseColor} 40%,
          ${shimmerColor} 50%,
          ${baseColor} 60%,
          ${baseColor} 100%
        )`,
        backgroundSize: '200% auto',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: `shimmer ${duration}s linear infinite`,
      }}
    >
      {children}
    </MotionComponent>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔤 OUTLINED TEXT
// Text with gradient outline/stroke
// ═══════════════════════════════════════════════════════════════════════════

interface OutlinedTextProps {
  children: ReactNode;
  className?: string;
  /** Stroke width in pixels */
  strokeWidth?: number;
  /** Fill or transparent */
  filled?: boolean;
  gradient?: GradientPreset;
}

export function OutlinedText({
  children,
  className,
  strokeWidth = 2,
  filled = false,
  gradient = 'beryl',
}: OutlinedTextProps) {
  return (
    <span
      className={cn(
        'inline-block relative',
        className
      )}
      style={{
        WebkitTextStroke: `${strokeWidth}px transparent`,
        WebkitTextFillColor: filled ? undefined : 'transparent',
        background: staticGradientPresets[gradient],
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
      }}
    >
      {children}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 💫 GLOWING TEXT
// Text with pulsing glow effect
// ═══════════════════════════════════════════════════════════════════════════

interface GlowingTextProps {
  children: ReactNode;
  className?: string;
  /** Glow color */
  color?: 'beryl' | 'violet' | 'white';
  /** Glow intensity */
  intensity?: 'low' | 'medium' | 'high';
  /** Animate the glow */
  animated?: boolean;
}

export function GlowingText({
  children,
  className,
  color = 'beryl',
  intensity = 'medium',
  animated = true,
}: GlowingTextProps) {
  const colorValues = {
    beryl: '#8a2be2',
    violet: '#7000ff',
    white: '#ffffff',
  };

  const intensityValues = {
    low: { blur1: 10, blur2: 20, opacity1: 0.3, opacity2: 0.15 },
    medium: { blur1: 20, blur2: 40, opacity1: 0.5, opacity2: 0.25 },
    high: { blur1: 30, blur2: 60, opacity1: 0.7, opacity2: 0.35 },
  };

  const glowColor = colorValues[color];
  const glowIntensity = intensityValues[intensity];

  return (
    <motion.span
      className={cn('inline-block', className)}
      style={{
        color: glowColor,
        textShadow: `
          0 0 ${glowIntensity.blur1}px rgba(${hexToRgb(glowColor)}, ${glowIntensity.opacity1}),
          0 0 ${glowIntensity.blur2}px rgba(${hexToRgb(glowColor)}, ${glowIntensity.opacity2})
        `,
      }}
      animate={animated ? {
        textShadow: [
          `0 0 ${glowIntensity.blur1}px rgba(${hexToRgb(glowColor)}, ${glowIntensity.opacity1}), 0 0 ${glowIntensity.blur2}px rgba(${hexToRgb(glowColor)}, ${glowIntensity.opacity2})`,
          `0 0 ${glowIntensity.blur1 * 1.5}px rgba(${hexToRgb(glowColor)}, ${glowIntensity.opacity1 * 1.2}), 0 0 ${glowIntensity.blur2 * 1.5}px rgba(${hexToRgb(glowColor)}, ${glowIntensity.opacity2 * 1.2})`,
          `0 0 ${glowIntensity.blur1}px rgba(${hexToRgb(glowColor)}, ${glowIntensity.opacity1}), 0 0 ${glowIntensity.blur2}px rgba(${hexToRgb(glowColor)}, ${glowIntensity.opacity2})`,
        ],
      } : undefined}
      transition={animated ? {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      } : undefined}
    >
      {children}
    </motion.span>
  );
}

// Helper function to convert hex to rgb
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '255, 255, 255';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🏷️ TECH LABEL
// Small monospace tech label
// ═══════════════════════════════════════════════════════════════════════════

interface TechLabelProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'beryl' | 'violet';
}

export function TechLabel({
  children,
  className,
  variant = 'default',
}: TechLabelProps) {
  const variantColors = {
    default: 'text-white/50',
    beryl: 'text-beryl-cyan',
    violet: 'text-violet-400',
  };

  return (
    <span
      className={cn(
        'inline-block font-mono text-[0.65rem] uppercase tracking-[0.15em]',
        variantColors[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export default GradientText;
