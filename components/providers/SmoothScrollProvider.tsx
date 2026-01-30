'use client';

import Lenis from 'lenis';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 SMOOTH SCROLL PROVIDER
// Wraps the app with Lenis smooth scrolling for Awwwards-level UX
// ═══════════════════════════════════════════════════════════════════════════

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: object) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized settings
    const lenisInstance = new Lenis({
      duration: 1.2, // Smooth duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    // Add lenis class to html for CSS targeting
    document.documentElement.classList.add('lenis');

    // Animation frame loop
    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenisInstance.destroy();
      document.documentElement.classList.remove('lenis');
    };
  }, []);

  // Scroll to target helper
  const scrollTo = (
    target: string | number | HTMLElement,
    options?: object
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: -100, // Account for fixed header
        duration: 1.2,
        ...options,
      });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export default SmoothScrollProvider;
