'use client';

import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// 🔘 BERYL BUTTON COMPONENT
// Premium gradient buttons with glow effects
// ═══════════════════════════════════════════════════════════════════════════

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'glow';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface BerylButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Icon before text */
  leftIcon?: React.ReactNode;
  /** Icon after text */
  rightIcon?: React.ReactNode;
  /** Rounded style */
  rounded?: 'default' | 'full';
  /** Disable hover animation */
  disableAnimation?: boolean;
  children: React.ReactNode;
}

// Variant styles - Neo-Terminal Purple
const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-[#8a2be2] to-[#b24bff]
    text-white font-semibold
    shadow-[0_4px_20px_rgba(138,43,226,0.3)]
    hover:shadow-[0_4px_30px_rgba(138,43,226,0.5)]
    hover:brightness-110
  `,
  secondary: `
    bg-void-200/80 backdrop-blur-md
    text-white font-medium
    border border-white/10
    hover:bg-void-200
    hover:border-white/20
  `,
  ghost: `
    bg-transparent
    text-white/70 font-medium
    hover:text-white
    hover:bg-white/5
  `,
  outline: `
    bg-transparent
    text-white font-medium
    border border-white/20
    hover:bg-white/5
    hover:border-[#8a2be2]/50
    hover:text-[#8a2be2]
  `,
  glow: `
    bg-void-100/60 backdrop-blur-xl
    text-[#8a2be2] font-semibold
    border border-[#8a2be2]/30
    shadow-[0_0_20px_rgba(138,43,226,0.2),inset_0_0_20px_rgba(138,43,226,0.05)]
    hover:border-[#8a2be2]/60
    hover:shadow-[0_0_30px_rgba(138,43,226,0.4),inset_0_0_30px_rgba(138,43,226,0.1)]
  `,
};

// Size styles
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-2.5 text-sm gap-2',
  lg: 'px-8 py-3 text-base gap-2',
  xl: 'px-10 py-4 text-lg gap-3',
};

// Rounded styles
const roundedStyles = {
  default: 'rounded-lg',
  full: 'rounded-full',
};

export const BerylButton = forwardRef<HTMLButtonElement, BerylButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      rounded = 'default',
      disableAnimation = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center',
          'transition-all duration-300 ease-smooth',
          'focus:outline-none focus:ring-2 focus:ring-[#8a2be2]/50 focus:ring-offset-2 focus:ring-offset-void',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          // Variant
          variantStyles[variant],
          // Size
          sizeStyles[size],
          // Rounded
          roundedStyles[rounded],
          // Full width
          fullWidth && 'w-full',
          className
        )}
        disabled={isDisabled}
        whileHover={!disableAnimation && !isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!disableAnimation && !isDisabled ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <LoadingSpinner size={size} />
          </motion.span>
        )}

        {/* Content */}
        <span
          className={cn(
            'flex items-center gap-inherit',
            loading && 'opacity-0'
          )}
        >
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>

        {/* Gradient border overlay for glow variant */}
        {variant === 'glow' && (
          <span
            className="absolute inset-0 rounded-inherit opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(138,43,226,0.1) 0%, rgba(178,75,255,0.1) 100%)',
            }}
          />
        )}
      </motion.button>
    );
  }
);

BerylButton.displayName = 'BerylButton';

// ═══════════════════════════════════════════════════════════════════════════
// ⏳ LOADING SPINNER
// ═══════════════════════════════════════════════════════════════════════════

function LoadingSpinner({ size }: { size: ButtonSize }) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };

  return (
    <svg
      className={cn('animate-spin', sizeMap[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔗 BERYL LINK BUTTON
// For navigation with button styling
// ═══════════════════════════════════════════════════════════════════════════

interface BerylLinkButtonProps extends Omit<HTMLMotionProps<'a'>, 'ref'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: 'default' | 'full';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const BerylLinkButton = forwardRef<HTMLAnchorElement, BerylLinkButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      rounded = 'default',
      leftIcon,
      rightIcon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <motion.a
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center',
          'transition-all duration-300 ease-smooth',
          'focus:outline-none focus:ring-2 focus:ring-[#8a2be2]/50',
          variantStyles[variant],
          sizeStyles[size],
          roundedStyles[rounded],
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </motion.a>
    );
  }
);

BerylLinkButton.displayName = 'BerylLinkButton';

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 ICON BUTTON
// ═══════════════════════════════════════════════════════════════════════════

interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref' | 'children'> {
  icon: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string; // For accessibility
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'ghost',
      size = 'md',
      label,
      className,
      ...props
    },
    ref
  ) => {
    const iconSizeStyles: Record<ButtonSize, string> = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-14 h-14',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg',
          'transition-all duration-300 ease-smooth',
          'focus:outline-none focus:ring-2 focus:ring-[#8a2be2]/50',
          variantStyles[variant],
          iconSizeStyles[size],
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={label}
        {...props}
      >
        {icon}
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default BerylButton;
