'use client';

import { cn } from '@/lib/utils';
import { motion, useInView, type Transition, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// 🎬 ANIMATED SECTION COMPONENT
// Framer Motion wrapper with fade-up-blur entrance animations
// ═══════════════════════════════════════════════════════════════════════════

type AnimationType = 
  | 'fade-up-blur'    // Signature Beryl animation
  | 'fade-up'         // Simple fade up
  | 'fade-in'         // Simple fade
  | 'fade-left'       // Slide from left
  | 'fade-right'      // Slide from right
  | 'scale-up'        // Scale in
  | 'blur-in';        // Only blur

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /** Animation type */
  animation?: AnimationType;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Duration of animation (seconds) */
  duration?: number;
  /** Stagger children animations */
  stagger?: boolean;
  /** Stagger delay between children (seconds) */
  staggerDelay?: number;
  /** Only animate once */
  once?: boolean;
  /** Viewport margin for trigger */
  margin?: string;
  /** HTML element to render as */
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'aside' | 'nav';
  /** Threshold for viewport intersection (0-1) */
  threshold?: number;
}

// Animation variants
const animations: Record<AnimationType, Variants> = {
  'fade-up-blur': {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    },
  },
  'fade-up': {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  'fade-in': {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
  'fade-left': {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },
  'fade-right': {
    hidden: {
      opacity: 0,
      x: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },
  'scale-up': {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  },
  'blur-in': {
    hidden: {
      opacity: 0,
      filter: 'blur(20px)',
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
    },
  },
};

export function AnimatedSection({
  children,
  className,
  animation = 'fade-up-blur',
  delay = 0,
  duration = 0.6,
  stagger = false,
  staggerDelay = 0.1,
  once = true,
  margin = '-100px',
  as = 'div',
  threshold = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once, 
    margin: margin as `-${number}px`,
    amount: threshold,
  });

  const MotionComponent = motion[as] as typeof motion.div;

  // Container variants for staggered children
  const containerVariants: Variants = stagger
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }
    : animations[animation];

  // Transition config
  const transition: Transition = {
    duration,
    delay: stagger ? 0 : delay,
    ease: [0.16, 1, 0.3, 1] as const, // Smooth easing
  };

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      transition={!stagger ? transition : undefined}
    >
      {children}
    </MotionComponent>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎭 ANIMATED ITEM
// Child component for staggered animations
// ═══════════════════════════════════════════════════════════════════════════

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  duration?: number;
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'li' | 'article';
}

export function AnimatedItem({
  children,
  className,
  animation = 'fade-up-blur',
  duration = 0.6,
  as = 'div',
}: AnimatedItemProps) {
  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent
      className={className}
      variants={animations[animation]}
      transition={{
        duration,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionComponent>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ✨ ANIMATED TEXT
// Character-by-character or word-by-word animation
// ═══════════════════════════════════════════════════════════════════════════

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** Animate by character or word */
  by?: 'character' | 'word';
  /** Delay before animation starts */
  delay?: number;
  /** Duration per character/word */
  duration?: number;
  /** Stagger delay between items */
  stagger?: number;
  /** Only animate once */
  once?: boolean;
  /** Animation type for each item */
  animation?: AnimationType;
}

export function AnimatedText({
  text,
  className,
  by = 'word',
  delay = 0,
  duration = 0.5,
  stagger = 0.05,
  once = true,
  animation = 'fade-up-blur',
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const items = by === 'character' ? text.split('') : text.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = animations[animation];

  return (
    <motion.span
      ref={ref}
      className={cn('inline-block', className)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      aria-label={text}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={itemVariants}
          transition={{
            duration,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {item}
          {by === 'word' && index < items.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔢 ANIMATED COUNTER
// Number counting animation
// ═══════════════════════════════════════════════════════════════════════════

interface AnimatedCounterProps {
  value: number;
  className?: string;
  duration?: number;
  delay?: number;
  /** Number format suffix (e.g., '+', '%', 'K') */
  suffix?: string;
  /** Number format prefix (e.g., '$') */
  prefix?: string;
  /** Decimal places */
  decimals?: number;
  once?: boolean;
}

export function AnimatedCounter({
  value,
  className,
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
  decimals = 0,
  once = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  return (
    <motion.span
      ref={ref}
      className={cn('inline-block tabular-nums', className)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay, duration: 0.3 }}
      >
        {isInView && (
          <CounterAnimation
            value={value}
            duration={duration}
            delay={delay}
            decimals={decimals}
          />
        )}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

// Counter animation helper
function CounterAnimation({
  value,
  duration,
  delay,
  decimals,
}: {
  value: number;
  duration: number;
  delay: number;
  decimals: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  // Use requestAnimationFrame for smooth counting
  useRef(() => {
    const node = nodeRef.current;
    if (!node) return;

    const startTime = performance.now() + delay * 1000;
    const endTime = startTime + duration * 1000;

    const animate = (currentTime: number) => {
      if (currentTime < startTime) {
        node.textContent = '0';
        requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const currentValue = easeProgress * value;

      node.textContent = currentValue.toFixed(decimals);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  });

  return <span ref={nodeRef}>{value.toFixed(decimals)}</span>;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 ANIMATED REVEAL
// Clip-path reveal animation
// ═══════════════════════════════════════════════════════════════════════════

interface AnimatedRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function AnimatedReveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  once = true,
}: AnimatedRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const clipPaths = {
    up: {
      hidden: 'inset(100% 0% 0% 0%)',
      visible: 'inset(0% 0% 0% 0%)',
    },
    down: {
      hidden: 'inset(0% 0% 100% 0%)',
      visible: 'inset(0% 0% 0% 0%)',
    },
    left: {
      hidden: 'inset(0% 100% 0% 0%)',
      visible: 'inset(0% 0% 0% 0%)',
    },
    right: {
      hidden: 'inset(0% 0% 0% 100%)',
      visible: 'inset(0% 0% 0% 0%)',
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn('overflow-hidden', className)}
      initial={{ clipPath: clipPaths[direction].hidden }}
      animate={isInView ? { clipPath: clipPaths[direction].visible } : { clipPath: clipPaths[direction].hidden }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 PARALLAX WRAPPER
// Simple parallax effect on scroll
// ═══════════════════════════════════════════════════════════════════════════

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Parallax speed (-1 to 1, negative = opposite direction) */
  speed?: number;
  /** Direction of parallax */
  direction?: 'vertical' | 'horizontal';
}

export function Parallax({
  children,
  className,
  speed = 0.5,
  direction = 'vertical',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        [direction === 'vertical' ? 'y' : 'x']: `calc(var(--scroll-progress, 0) * ${speed * 100}px)`,
      }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedSection;
