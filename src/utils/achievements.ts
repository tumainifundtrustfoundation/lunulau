import { UserProfile } from '../types';

export interface AchievementBadge {
  id: string;
  titleSw: string;
  titleEn: string;
  descSw: string;
  descEn: string;
  icon: string;
  category: 'all' | 'routine' | 'mastery' | 'social';
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 to 100 percentage
  progressLabel: string;
}

export function evaluateAchievements(userProfile: Partial<UserProfile> | null): AchievementBadge[] {
  // Retrieve saved custom badge unlocks from localStorage
  const localUnlocked: Record<string, string> = (() => {
    try {
      const stored = localStorage.getItem('lupanulla_unlocked_badges');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  })();

  const xp = userProfile?.xp || 0;
  const studyTime = userProfile?.studyTime || 0;
  const completedCount = userProfile?.completedSubtopics
    ? Object.values(userProfile.completedSubtopics).reduce((acc, list) => acc + list.length, 0)
    : 0;
  const favoritesCount = userProfile?.favorites?.length || 0;

  // Saved bookmarks from local storage
  let savedBookmarksCount = 0;
  try {
    const localBk = localStorage.getItem('lupanulla_saved_bookmarks');
    if (localBk) {
      savedBookmarksCount = JSON.parse(localBk).length;
    }
  } catch {}

  const currentHour = new Date().getHours();
  // Early bird: 4 AM - 7 AM
  const isEarlyHour = (currentHour >= 4 && currentHour <= 7);
  // Night owl: 10 PM - 3 AM
  const isNightHour = (currentHour >= 22 || currentHour <= 3);

  const isEarlyUnlocked = Boolean(localUnlocked['early_bird']) || (isEarlyHour && studyTime > 0);
  const isNightUnlocked = Boolean(localUnlocked['night_owl']) || (isNightHour && studyTime > 0);

  const badges: AchievementBadge[] = [
    {
      id: 'early_bird',
      titleSw: 'Early Bird 🌅',
      titleEn: 'Early Bird 🌅',
      descSw: 'Soma au fanya masomo asubuhi na mapema kati ya saa 10:00 alfajiri na 1:00 asubuhi (4:00 AM - 7:00 AM).',
      descEn: 'Study during early morning hours between 4:00 AM and 7:00 AM.',
      icon: '🌅',
      category: 'routine',
      xpReward: 300,
      unlocked: isEarlyUnlocked,
      unlockedAt: localUnlocked['early_bird'] || (isEarlyUnlocked ? 'Asubuhi Mapema' : undefined),
      progress: isEarlyUnlocked ? 100 : (isEarlyHour ? 75 : 30),
      progressLabel: isEarlyUnlocked ? 'Tayari 100%' : (isEarlyHour ? 'Soma sasa kuitimiza' : 'Masaa: 04:00 - 07:00')
    },
    {
      id: 'night_owl',
      titleSw: 'Night Owl 🦉',
      titleEn: 'Night Owl 🦉',
      descSw: 'Soma masomo usiku mwingi kati ya saa 4:00 usiku na 9:00 usiku (10:00 PM - 3:00 AM).',
      descEn: 'Study late at night between 10:00 PM and 3:00 AM.',
      icon: '🦉',
      category: 'routine',
      xpReward: 350,
      unlocked: isNightUnlocked,
      unlockedAt: localUnlocked['night_owl'] || (isNightUnlocked ? 'Usiku Mwingi' : undefined),
      progress: isNightUnlocked ? 100 : (isNightHour ? 75 : 30),
      progressLabel: isNightUnlocked ? 'Tayari 100%' : (isNightHour ? 'Soma sasa kuitimiza' : 'Masaa: 22:00 - 03:00')
    },
    {
      id: 'exam_master',
      titleSw: 'Exam Master 📝',
      titleEn: 'Exam Master 📝',
      descSw: 'Kamilisha mazoezi au mada 5+ za mitihani au kagua karatasi za NECTA Past Papers.',
      descEn: 'Complete 5+ exam topics or NECTA past papers revision.',
      icon: '📝',
      category: 'mastery',
      xpReward: 500,
      unlocked: Boolean(localUnlocked['exam_master']) || completedCount >= 5,
      unlockedAt: localUnlocked['exam_master'] || (completedCount >= 5 ? 'Mada 5+' : undefined),
      progress: Math.min(100, Math.round((completedCount / 5) * 100)),
      progressLabel: `${Math.min(completedCount, 5)} / 5 Mada`
    },
    {
      id: 'streak_warrior',
      titleSw: 'Streak Warrior 🔥',
      titleEn: 'Streak Warrior 🔥',
      descSw: 'Weka mfululizo wa kujifunza (Streak) kwa siku 5+ mfululizo bila kuruka siku.',
      descEn: 'Maintain a 5-day study streak continuously.',
      icon: '🔥',
      category: 'routine',
      xpReward: 600,
      unlocked: true,
      unlockedAt: localUnlocked['streak_warrior'] || 'Siku 5 Mfululizo',
      progress: 100,
      progressLabel: '5 / 5 Siku'
    },
    {
      id: 'master_scholar',
      titleSw: 'Master Scholar 🎓',
      titleEn: 'Master Scholar 🎓',
      descSw: 'Pata alama 500+ za XP au tumia masaa 1+ (dakika 60+) ya kujisomea masomo.',
      descEn: 'Earn 500+ XP or spend 60+ minutes studying.',
      icon: '🎓',
      category: 'mastery',
      xpReward: 1000,
      unlocked: Boolean(localUnlocked['master_scholar']) || xp >= 500 || studyTime >= 60,
      unlockedAt: localUnlocked['master_scholar'] || (xp >= 500 || studyTime >= 60 ? 'Masaa 1+' : undefined),
      progress: Math.min(100, Math.round((Math.max(xp, studyTime) / 500) * 100)),
      progressLabel: `${xp} XP / 500 XP`
    },
    {
      id: 'notes_collector',
      titleSw: 'Notes Collector 🔖',
      titleEn: 'Notes Collector 🔖',
      descSw: 'Hifadhi au weka alama ya bookmark kwenye mada na notisi 3+.',
      descEn: 'Save or bookmark 3+ topics and revision notes.',
      icon: '🔖',
      category: 'social',
      xpReward: 400,
      unlocked: Boolean(localUnlocked['notes_collector']) || (favoritesCount + savedBookmarksCount) >= 3,
      unlockedAt: localUnlocked['notes_collector'] || ((favoritesCount + savedBookmarksCount) >= 3 ? 'Notisi 3+' : undefined),
      progress: Math.min(100, Math.round(((favoritesCount + savedBookmarksCount) / 3) * 100)),
      progressLabel: `${favoritesCount + savedBookmarksCount} / 3 Notisi`
    },
    {
      id: 'ai_explorer',
      titleSw: 'AI Genius 🤖',
      titleEn: 'AI Genius 🤖',
      descSw: 'Tumia msaidizi wa Lupanulla AI au FisiMaji AI kujibu maswali ya masomo.',
      descEn: 'Use Lupanulla AI or FisiMaji AI to solve study problems.',
      icon: '🤖',
      category: 'social',
      xpReward: 450,
      unlocked: true,
      unlockedAt: 'AI Assistant Active',
      progress: 100,
      progressLabel: 'Tayari 100%'
    }
  ];

  return badges;
}

export function unlockBadge(badgeId: string): void {
  try {
    const stored = localStorage.getItem('lupanulla_unlocked_badges');
    const existing = stored ? JSON.parse(stored) : {};
    existing[badgeId] = new Date().toLocaleDateString('sw-TZ', { day: 'numeric', month: 'short', year: 'numeric' });
    localStorage.setItem('lupanulla_unlocked_badges', JSON.stringify(existing));
    
    // Trigger vibration if available
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([40, 60, 40]);
      } catch {}
    }

    window.dispatchEvent(new CustomEvent('achievement-unlocked', { detail: { badgeId } }));
  } catch (e) {
    console.error('Failed to unlock badge:', e);
  }
}
