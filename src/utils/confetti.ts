import confetti from 'canvas-confetti';

/**
 * Triggers a vibrant multi-directional celebratory confetti explosion.
 * Ideal for completing daily study goals, unlocking badges, or passing exams.
 */
export function triggerCelebrationConfetti(options?: {
  particleCount?: number;
  spread?: number;
  originY?: number;
}) {
  try {
    const count = options?.particleCount || 100;
    const spread = options?.spread || 80;
    const originY = options?.originY ?? 0.6;

    // Center burst
    confetti({
      particleCount: count,
      spread: spread,
      origin: { y: originY },
      zIndex: 9999,
      colors: ['#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6']
    });

    // Side canons burst
    setTimeout(() => {
      confetti({
        particleCount: Math.round(count * 0.6),
        angle: 60,
        spread: 55,
        origin: { x: 0, y: originY },
        zIndex: 9999,
        colors: ['#f59e0b', '#10b981', '#06b6d4']
      });
      confetti({
        particleCount: Math.round(count * 0.6),
        angle: 120,
        spread: 55,
        origin: { x: 1, y: originY },
        zIndex: 9999,
        colors: ['#ec4899', '#8b5cf6', '#3b82f6']
      });
    }, 150);
  } catch (e) {
    console.warn('Confetti trigger failed:', e);
  }
}

/**
 * Specifically tailored for Badge Unlocks with golden & star confetti streams
 */
export function triggerBadgeUnlockConfetti() {
  try {
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Gold & cyan theme
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#fbbf24', '#f59e0b', '#d97706', '#38bdf8']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#fbbf24', '#f59e0b', '#10b981', '#06b6d4']
      });
    }, 250);
  } catch (e) {
    console.warn('Badge confetti trigger failed:', e);
  }
}

/**
 * Specifically tailored for Daily Study Goal completion
 */
export function triggerGoalCompletedConfetti() {
  try {
    const count = 120;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#10b981', '#34d399']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#06b6d4', '#38bdf8']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#f59e0b', '#fbbf24']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#ec4899', '#a855f7']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#3b82f6', '#10b981']
    });
  } catch (e) {
    console.warn('Goal completion confetti failed:', e);
  }
}
