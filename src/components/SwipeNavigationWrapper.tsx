import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Smartphone, 
  BookOpen, 
  LayoutDashboard, 
  Book, 
  FileText 
} from 'lucide-react';

interface SwipeNavigationWrapperProps {
  activeView: string;
  onNavigate: (view: string) => void;
  children: React.ReactNode;
}

const SWIPEABLE_VIEWS = [
  { id: 'portal', label: 'Nyumbani', icon: BookOpen },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'masomo', label: 'Masomo', icon: Book },
  { id: 'mitihani', label: 'Mitihani', icon: FileText }
];

// Motion animation variants for horizontal slide transition
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : direction < 0 ? -60 : 0,
    opacity: 0,
    scale: 0.99
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : direction < 0 ? 60 : 0,
    opacity: 0,
    scale: 0.99
  })
};

export default function SwipeNavigationWrapper({
  activeView,
  onNavigate,
  children
}: SwipeNavigationWrapperProps) {
  const [swipeToast, setSwipeToast] = useState<{
    direction: 'left' | 'right';
    targetViewLabel: string;
    fromViewLabel: string;
  } | null>(null);

  const [slideDirection, setSlideDirection] = useState<number>(0);
  const prevIndexRef = useRef<number>(SWIPEABLE_VIEWS.findIndex(v => v.id === activeView));

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentIndex = SWIPEABLE_VIEWS.findIndex(v => v.id === activeView);
  const isSwipeableCurrentView = currentIndex !== -1;

  // Track direction of view changes to animate horizontal slide smoothly
  useEffect(() => {
    if (currentIndex !== -1 && prevIndexRef.current !== -1 && currentIndex !== prevIndexRef.current) {
      setSlideDirection(currentIndex > prevIndexRef.current ? 1 : -1);
    } else if (currentIndex === -1 || prevIndexRef.current === -1) {
      setSlideDirection(0);
    }
    prevIndexRef.current = currentIndex;
  }, [activeView, currentIndex]);

  // Clear toast timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isSwipeableCurrentView) return;
    if (e.touches.length !== 1) return;

    const target = e.target as HTMLElement | null;
    if (target) {
      // Ignore swipe gesture if starting inside interactive controls or scrollable carousels
      const isInteractive = target.closest(
        'input, textarea, select, button, [role="slider"], .overflow-x-auto, .overflow-x-scroll, [data-no-swipe], iframe'
      );
      if (isInteractive) return;
    }

    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !isSwipeableCurrentView) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const duration = Date.now() - touchStartRef.current.time;

    touchStartRef.current = null;

    // Must be a fast horizontal flick (duration < 650ms, abs(deltaX) >= 60px, abs(deltaX) > abs(deltaY) * 1.4)
    if (duration > 650) return;
    if (Math.abs(deltaX) < 60) return;
    if (Math.abs(deltaX) <= Math.abs(deltaY) * 1.4) return;

    // Swipe Left -> Go Next (e.g., Dashboard -> Masomo -> Mitihani)
    if (deltaX < 0) {
      if (currentIndex < SWIPEABLE_VIEWS.length - 1) {
        const nextView = SWIPEABLE_VIEWS[currentIndex + 1];
        const currentView = SWIPEABLE_VIEWS[currentIndex];
        
        triggerToast('left', nextView.label, currentView.label);
        onNavigate(nextView.id);
      }
    } 
    // Swipe Right -> Go Previous (e.g., Mitihani -> Masomo -> Dashboard)
    else if (deltaX > 0) {
      if (currentIndex > 0) {
        const prevView = SWIPEABLE_VIEWS[currentIndex - 1];
        const currentView = SWIPEABLE_VIEWS[currentIndex];

        triggerToast('right', prevView.label, currentView.label);
        onNavigate(prevView.id);
      }
    }
  };

  const triggerHapticFeedback = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([25, 30, 25]);
      } catch (e) {
        // Ignore if unsupported or restricted by permissions
      }
    }
  };

  const triggerToast = (direction: 'left' | 'right', targetViewLabel: string, fromViewLabel: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);

    triggerHapticFeedback();

    setSwipeToast({
      direction,
      targetViewLabel,
      fromViewLabel
    });

    toastTimeoutRef.current = setTimeout(() => {
      setSwipeToast(null);
    }, 1800);
  };

  return (
    <div 
      className="relative min-h-screen w-full overflow-x-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Mobile Swipe Navigation Hint Bar for Primary Views */}
      {isSwipeableCurrentView && (
        <div className="md:hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/60 px-3 py-2 text-white text-[11px] font-bold flex items-center justify-between shadow-sm sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-cyan-300">
            <Smartphone size={13} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">Teleza (Swipe):</span>
          </div>

          {/* Mini Interactive View Tabs / Dots */}
          <div className="flex items-center gap-1.5">
            {SWIPEABLE_VIEWS.map((v) => {
              const Icon = v.icon;
              const isActive = v.id === activeView;
              return (
                <button
                  key={v.id}
                  onClick={() => {
                    triggerHapticFeedback();
                    onNavigate(v.id);
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] font-black transition-all flex items-center gap-1 border ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm shadow-cyan-500/30 scale-105'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                  title={`Sogea hadi ${v.label}`}
                >
                  <Icon size={11} />
                  <span className={isActive ? 'inline' : 'hidden sm:inline'}>{v.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-0.5 text-slate-400 text-[9px] font-black uppercase">
            <ChevronLeft size={12} />
            <span>↔️</span>
            <ChevronRight size={12} />
          </div>
        </div>
      )}

      {/* Animated Main View Content Container */}
      <AnimatePresence mode="wait" custom={slideDirection}>
        <motion.div
          key={activeView}
          custom={slideDirection}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 320, damping: 32 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 }
          }}
          className="w-full min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Animated Swipe HUD Gesture Toast */}
      <AnimatePresence>
        {swipeToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[100] bg-slate-950/90 text-white border border-cyan-500/40 shadow-2xl backdrop-blur-xl px-4 py-2.5 rounded-2xl flex items-center gap-3 pointer-events-none"
          >
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-400/30">
              {swipeToast.direction === 'left' ? (
                <ChevronRight size={18} className="animate-bounce-x" />
              ) : (
                <ChevronLeft size={18} className="animate-bounce-x-reverse" />
              )}
            </div>

            <div className="space-y-0.5">
              <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest block">
                Umesogea (Swiped)
              </span>
              <p className="text-xs font-black text-white flex items-center gap-1.5">
                <span>{swipeToast.fromViewLabel}</span>
                <span className="text-cyan-400">→</span>
                <span className="text-amber-300 font-extrabold">{swipeToast.targetViewLabel}</span>
              </p>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
              {SWIPEABLE_VIEWS.map((v) => (
                <div
                  key={v.id}
                  className={`w-2 h-2 rounded-full transition-all ${
                    v.label === swipeToast.targetViewLabel
                      ? 'bg-cyan-400 w-4'
                      : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
