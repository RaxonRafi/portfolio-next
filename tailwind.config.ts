import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // ═══════════════════════════════════════════════════════════════════════
      // 🎨 BERYL COLOR SYSTEM
      // ═══════════════════════════════════════════════════════════════════════
      colors: {
        // Void Colors - Base backgrounds (#121212 Neo-Terminal Dark)
        void: {
          DEFAULT: '#121212',
          50: '#1a1a1a',
          100: '#232323',
          200: '#2c2c2c',
          300: '#333d47',
          400: '#404040',
          500: '#4a4a4a',
        },
        
        // Neo-Terminal Purple - Primary Accent
        beryl: {
          cyan: '#8a2be2',
          green: '#b24bff',
          DEFAULT: '#8a2be2',
          50: '#f3e8ff',
          100: '#e0cfff',
          200: '#c49fff',
          300: '#a770ff',
          400: '#9d4edd',
          500: '#8a2be2',
          600: '#7000ff',
          700: '#5a00cc',
          800: '#440099',
          900: '#2e0066',
        },
        
        // Deep Violet - Secondary Accent for depth/shadows
        violet: {
          DEFAULT: '#7000ff',
          50: '#f3e8ff',
          100: '#e0cfff',
          200: '#c49fff',
          300: '#a770ff',
          400: '#8b40ff',
          500: '#7000ff',
          600: '#5a00cc',
          700: '#440099',
          800: '#2e0066',
          900: '#170033',
        },
        
        // Glass Material Colors
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          light: 'rgba(255, 255, 255, 0.08)',
          medium: 'rgba(255, 255, 255, 0.12)',
          border: 'rgba(255, 255, 255, 0.1)',
          glow: 'rgba(138, 43, 226, 0.15)',
        },
        
        // Existing shadcn/ui semantic colors (keeping compatibility)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      // ═══════════════════════════════════════════════════════════════════════
      // 🔤 TYPOGRAPHY
      // ═══════════════════════════════════════════════════════════════════════
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'JetBrains Mono', 'monospace'],
        display: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.025em',
        wide: '0.1em',
        wider: '0.15em',
        widest: '0.25em',
      },

      // ═══════════════════════════════════════════════════════════════════════
      // 📐 SPACING & SIZING
      // ═══════════════════════════════════════════════════════════════════════
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      // ═══════════════════════════════════════════════════════════════════════
      // 🌟 BACKGROUND GRADIENTS
      // ═══════════════════════════════════════════════════════════════════════
      backgroundImage: {
        // Primary Neo-Terminal Gradient (Purple shades)
        'beryl-gradient': 'linear-gradient(135deg, #8a2be2 0%, #b24bff 100%)',
        'beryl-gradient-h': 'linear-gradient(90deg, #8a2be2 0%, #b24bff 100%)',
        'beryl-gradient-v': 'linear-gradient(180deg, #8a2be2 0%, #b24bff 100%)',
        
        // Violet Depth Gradients
        'violet-gradient': 'linear-gradient(135deg, #7000ff 0%, #3d0087 100%)',
        'void-gradient': 'linear-gradient(180deg, #121212 0%, #1a1a1a 100%)',
        
        // Glassmorphism Overlays
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
        
        // Radial Glow Effects - Purple
        'beryl-glow': 'radial-gradient(ellipse at center, rgba(138, 43, 226, 0.15) 0%, transparent 70%)',
        'violet-glow': 'radial-gradient(ellipse at center, rgba(112, 0, 255, 0.15) 0%, transparent 70%)',
        
        // Hero Section Gradient - Purple
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(138, 43, 226, 0.15), transparent)',
      },

      // ═══════════════════════════════════════════════════════════════════════
      // 🎬 KEYFRAMES & ANIMATIONS
      // ═══════════════════════════════════════════════════════════════════════
      keyframes: {
        // Existing shadcn/ui animations
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        
        // Fade Up + Blur In (Primary entrance animation)
        'fade-up-blur': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
            filter: 'blur(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
            filter: 'blur(0px)',
          },
        },
        
        // Fade In (Simple opacity)
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        
        // Glow Pulse (For accent elements)
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.5), 0 0 60px rgba(0, 240, 255, 0.2)',
          },
        },
        
        // Gradient Shift (For text gradients on hover)
        'gradient-shift': {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        
        // Float Animation (For 3D elements)
        'float': {
          '0%, 100%': {
            transform: 'translateY(0) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(-10px) rotate(2deg)',
          },
        },
        
        // Shimmer Effect (For loading states)
        'shimmer': {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        
        // Scale In (For modal/popup elements)
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },

        // Rotate (For loading spinners)
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },

        // Border Glow Animation
        'border-glow': {
          '0%, 100%': {
            borderColor: 'rgba(0, 240, 255, 0.3)',
          },
          '50%': {
            borderColor: 'rgba(0, 255, 157, 0.5)',
          },
        },
      },
      
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up-blur': 'fade-up-blur 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scale-in': 'scale-in 0.2s ease-out forwards',
        'spin-slow': 'spin-slow 8s linear infinite',
        'border-glow': 'border-glow 2s ease-in-out infinite',
      },

      // ═══════════════════════════════════════════════════════════════════════
      // 🌫️ BACKDROP & EFFECTS
      // ═══════════════════════════════════════════════════════════════════════
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
      
      boxShadow: {
        // Neo-Terminal Purple Glow Shadows
        'beryl-sm': '0 0 10px rgba(138, 43, 226, 0.2)',
        'beryl-md': '0 0 20px rgba(138, 43, 226, 0.3)',
        'beryl-lg': '0 0 40px rgba(138, 43, 226, 0.4)',
        'beryl-xl': '0 0 60px rgba(138, 43, 226, 0.5)',
        
        // Violet Depth Shadows
        'violet-sm': '0 0 10px rgba(112, 0, 255, 0.2)',
        'violet-md': '0 0 20px rgba(112, 0, 255, 0.3)',
        'violet-lg': '0 0 40px rgba(112, 0, 255, 0.4)',
        
        // Glass Inner Glow
        'glass-inner': 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
        'glass-outer': '0 8px 32px rgba(0, 0, 0, 0.4)',
        
        // Combined Glass Effect
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.05)',
      },

      // ═══════════════════════════════════════════════════════════════════════
      // ⏱️ TRANSITIONS
      // ═══════════════════════════════════════════════════════════════════════
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
